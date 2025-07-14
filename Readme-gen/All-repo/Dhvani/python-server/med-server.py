# med-server.py
import os
import io
import base64
import torch
import timm
import numpy as np
import cv2
import time
from PIL import Image
from flask import Flask, request, render_template, send_file, jsonify
from flask_cors import CORS
from torchvision import transforms
from pytorch_grad_cam import GradCAM
from pytorch_grad_cam.utils.image import show_cam_on_image
from pytorch_grad_cam.utils.model_targets import ClassifierOutputTarget

# --- Configuration ---
app = Flask(__name__)
CORS(app)  # Enable CORS for frontend integration
app.config['MAX_CONTENT_LENGTH'] = 16 * 1024 * 1024  # 16 MB max upload size

# --- Model Loading ---
VIT_MODEL = None
DEVICE = "cuda" if torch.cuda.is_available() else "cpu"

# ViT Configuration
VIT_MODEL_NAME = "vit_base_patch16_224.augreg2_in21k_ft_in1k"
VIT_MODEL_PATH = "checkpoints/vit_model.pth"
VIT_LABEL_MAP = {0: "Normal", 1: "TB Detected"}

# ViT preprocessing transform
vit_transform = transforms.Compose([
    transforms.Resize((224, 224)),
    transforms.ToTensor(),
    transforms.Normalize(
        mean=[0.485, 0.456, 0.406],
        std =[0.229, 0.224, 0.225]
    )
])
def load_vit_model():
    """Loads the ViT model for TB detection."""
    global VIT_MODEL
    print("--- Loading ViT Model ---")
    
    if not os.path.exists(VIT_MODEL_PATH):
        print(f"Warning: ViT model file not found at {VIT_MODEL_PATH}. ViT features will be disabled.")
        return
    
    try:
        model = timm.create_model(VIT_MODEL_NAME, pretrained=False, num_classes=2)
        model.load_state_dict(torch.load(VIT_MODEL_PATH, map_location=DEVICE))
        model.to(DEVICE)
        model.eval()
        VIT_MODEL = model
        print("Successfully loaded ViT model for TB detection.")
    except Exception as e:
        print(f"Failed to load ViT model. Error: {e}")


TB_THRESHOLD = 0.85   # require at least 85% TB confidence to call it positive

def analyze_with_vit(image_pil):
    """
    Performs TB detection using ViT model and generates Grad-CAM heatmap only if TB is detected.
    Returns prediction results and optionally a heatmap PIL image (None if no TB).
    """
    if VIT_MODEL is None:
        raise ValueError("ViT model is not loaded.")
    
    start_time = time.time()
    
    # Preprocess image
    input_tensor = vit_transform(image_pil).unsqueeze(0).to(DEVICE)
    
    # Forward pass for prediction (no gradients needed)
    with torch.no_grad():
        output = VIT_MODEL(input_tensor)
        probs = torch.softmax(output, dim=1)[0]
        tb_score = float(probs[1])
        pred_class = 1 if tb_score >= TB_THRESHOLD else 0
    
    cam_image_pil = None
    if pred_class == 1:
        # Compute Grad-CAM only for positive cases
        input_tensor.requires_grad_(True)
        target_layer = VIT_MODEL.patch_embed.proj
        cam = GradCAM(model=VIT_MODEL, target_layers=[target_layer])
        targets = [ClassifierOutputTarget(pred_class)]
        grayscale_cam = cam(input_tensor=input_tensor, targets=targets)[0]
        
        original_image = np.array(image_pil.resize((224, 224))) / 255.0
        cam_image = show_cam_on_image(original_image, grayscale_cam, use_rgb=True)
        cam_image_pil = Image.fromarray(cam_image)
    
    processing_time = time.time() - start_time
    
    results = {
        'prediction': VIT_LABEL_MAP[pred_class],
        'confidence': {
            'tb_detected': tb_score,
            'normal': float(probs[0])
        },
        'predicted_class': pred_class,
        'processing_time': processing_time
    }
    
    return results, cam_image_pil


def pil_to_base64(pil_img):
    """Converts a PIL image to a Base64 string."""
    img_buffer = io.BytesIO()
    pil_img.save(img_buffer, format="PNG")
    return base64.b64encode(img_buffer.getvalue()).decode('utf-8')

# --- Flask Routes ---

@app.route('/health', methods=['GET'])
def health_check():
    """Health check endpoint."""
    return jsonify({
        "status": "healthy",
        "vit_model_loaded": VIT_MODEL is not None,
        "device": str(DEVICE)
    })

@app.route('/vit_analyze', methods=['POST'])
def api_vit_analyze():
    """Dedicated API endpoint for ViT TB detection."""
    if VIT_MODEL is None:
        return jsonify({
            "error": "ViT model is not loaded. Please check server logs.",
            "success": False
        }), 503
        
    if 'file' not in request.files:
        return jsonify({
            "error": "No file part in request.",
            "success": False
        }), 400
    
    file = request.files['file']
    
    if file.filename == '':
        return jsonify({
            "error": "No file selected.",
            "success": False
        }), 400
    
    # Validate file type
    allowed_extensions = {'.jpg', '.jpeg', '.png'}
    file_ext = os.path.splitext(file.filename)[1].lower()
    if file_ext not in allowed_extensions:
        return jsonify({
            "error": f"Unsupported file type. Allowed types: {', '.join(allowed_extensions)}",
            "success": False
        }), 400
        
    try:
        # Load and validate image
        original_img = Image.open(file.stream)
        if original_img.mode != 'RGB':
            original_img = original_img.convert('RGB')
        
        vit_results, heatmap_img = analyze_with_vit(original_img)
        b64_heatmap = pil_to_base64(heatmap_img) if heatmap_img is not None else None
        
        return jsonify({
            "prediction": vit_results['prediction'],
            "confidence": vit_results['confidence'],
            "heatmap_image": b64_heatmap,      # null for "Normal"
            "processing_time": vit_results['processing_time'],
            "success": True
        })
        
    except Exception as e:
        print(f"Error during ViT analysis: {e}")
        return jsonify({
            "error": f"An error occurred during analysis: {str(e)}",
            "success": False
        }), 500

@app.route('/models', methods=['GET'])
def list_models():
    """API endpoint to list all available models."""
    available_models = {
        "classification_models": ["ViT_TB_Detection"] if VIT_MODEL is not None else [],
        "device": str(DEVICE),
        "vit_model_loaded": VIT_MODEL is not None
    }
    return jsonify(available_models)

@app.route('/', methods=['GET'])
def index():
    """Basic info page."""
    return jsonify({
        "message": "TB Detection API Server",
        "endpoints": {
            "/health": "Health check",
            "/vit_analyze": "POST - TB detection analysis",
            "/models": "GET - List available models"
        },
        "status": "running"
    })

if __name__ == '__main__':
    # Ensure results directory exists
    os.makedirs("results", exist_ok=True)
    os.makedirs("checkpoints", exist_ok=True)
    
    print("=== TB Detection Server Starting ===")
    print(f"Device: {DEVICE}")
    
    # Load the ViT model
    load_vit_model()
    
    if VIT_MODEL is None:
        print("WARNING: No models loaded. Please ensure model files are in the checkpoints directory.")
    else:
        print("✅ Server ready for TB detection!")
    
    # Start the Flask server
    app.run(host='0.0.0.0', port=5001, debug=True)