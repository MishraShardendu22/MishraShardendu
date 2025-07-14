import torch
import numpy as np
from segment_anything import sam_model_registry, SamPredictor
from PIL import Image
import os

def test_installation():
    try:
        # Test basic imports
        print("✅ PyTorch:", torch.__version__)
        print("✅ CUDA available:", torch.cuda.is_available())
        
        # Test model loading
        device = torch.device('cuda' if torch.cuda.is_available() else 'cpu')
        print(f"✅ Using device: {device}")
        
        # Test if we can load a checkpoint
        model_path = "checkpoints/MedSAM2_latest.pt"
        if os.path.exists(model_path):
            checkpoint = torch.load(model_path, map_location=device)
            print("✅ Model checkpoint loaded successfully")
        else:
            print("❌ Model checkpoint not found. Please download models first.")
            
        print("🎉 Installation verification complete!")
        
    except Exception as e:
        print(f"❌ Error during verification: {e}")

if __name__ == "__main__":
    test_installation()