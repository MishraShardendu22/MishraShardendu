import torch
import timm
import numpy as np
import cv2
import os
from PIL import Image
from torchvision import transforms
import matplotlib.pyplot as plt
from pytorch_grad_cam import GradCAM
from pytorch_grad_cam.utils.image import show_cam_on_image
from pytorch_grad_cam.utils.model_targets import ClassifierOutputTarget

# === CONFIG ===
MODEL_NAME = "vit_base_patch16_224.augreg2_in21k_ft_in1k"
MODEL_PATH = "checkpoints/vit_model.pth"
IMAGE_PATH = "image2.png"
OUTPUT_PATH = "results/tb_detection_result.png"
DEVICE = torch.device("cuda" if torch.cuda.is_available() else "cpu")

# === Prepare directories ===
os.makedirs(os.path.dirname(OUTPUT_PATH), exist_ok=True)

# === Load ViT model from timm ===
model = timm.create_model(MODEL_NAME, pretrained=False, num_classes=2)
model.load_state_dict(torch.load(MODEL_PATH, map_location=DEVICE))
model.to(DEVICE)
model.eval()

# === Image preprocessing ===
transform = transforms.Compose([
    transforms.Resize((224, 224)),  # Make sure this matches training
    transforms.ToTensor(),
    transforms.Normalize(mean=[0.5]*3, std=[0.5]*3)  # Adjust if needed
])

image = Image.open(IMAGE_PATH).convert("RGB")
input_tensor = transform(image).unsqueeze(0).to(DEVICE)

# === Prediction ===
with torch.no_grad():
    output = model(input_tensor)
    pred_class = torch.argmax(output, dim=1).item()

label_map = {0: "Normal", 1: "TB Detected"}
print(f"[INFO] Model prediction: {label_map[pred_class]}")

# === Grad-CAM setup ===
# ✅ Works with Grad-CAM
target_layer = model.patch_embed.proj

cam = GradCAM(model=model, target_layers=[target_layer])
targets = [ClassifierOutputTarget(pred_class)]
grayscale_cam = cam(input_tensor=input_tensor, targets=targets)[0]

# === Overlay CAM on image ===
original_image = np.array(image.resize((224, 224))) / 255.0
cam_image = show_cam_on_image(original_image, grayscale_cam, use_rgb=True)

# === Save image ===
cam_image_bgr = cv2.cvtColor(cam_image, cv2.COLOR_RGB2BGR)
cv2.imwrite(OUTPUT_PATH, cam_image_bgr)
print(f"[INFO] Heatmap saved to {OUTPUT_PATH}")
probs = torch.softmax(output, dim=1)[0]
print(f"[INFO] Confidence: TB = {probs[1]:.4f}, Normal = {probs[0]:.4f}")

probs = torch.softmax(output, dim=1)[0]
pred_class = torch.argmax(probs).item()
print(f"[INFO] Model prediction: {'TB Detected' if pred_class == 1 else 'Normal'}")
print(f"[INFO] Confidence: TB = {probs[1]:.4f}, Normal = {probs[0]:.4f}")
