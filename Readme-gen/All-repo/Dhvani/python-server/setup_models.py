import os

# Folder to store downloaded model checkpoints
CHECKPOINTS_DIR = "checkpoints"

# List of expected model files (adjust names to match yours)
MODEL_FILES = [
    "MedSAM2_latest.pt"
]

def download_models():
    """Downloads required model files (placeholder)."""
    os.makedirs(CHECKPOINTS_DIR, exist_ok=True)
    
    # Add logic to download your models here (optional)
    # For now, just print a reminder
    for model_name in MODEL_FILES:
        model_path = os.path.join(CHECKPOINTS_DIR, model_name)
        if not os.path.exists(model_path):
            print(f"❗ Model {model_name} not found. Please place it in the '{CHECKPOINTS_DIR}' folder manually.")
        else:
            print(f"✅ Found model: {model_name}")
