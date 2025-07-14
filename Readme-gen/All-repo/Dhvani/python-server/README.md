# 🏥 Medical Image Analysis Server

A comprehensive Flask-based web application for medical image analysis combining state-of-the-art segmentation and classification models. This server integrates **MedSAM2** for medical image segmentation and **Vision Transformer (ViT)** for tuberculosis detection with Grad-CAM visualization.

## 🚀 Features

- **🎯 Medical Image Segmentation**: MedSAM2 models for precise anatomical structure segmentation
- **🔍 TB Detection**: Vision Transformer model for tuberculosis classification with confidence scores
- **🔥 Grad-CAM Visualization**: Heatmap overlays showing model attention areas
- **🌐 Web Interface**: User-friendly interface for uploading and analyzing medical images
- **🔌 REST API**: Complete API endpoints for programmatic access
- **📱 Responsive Design**: Mobile-friendly interface with modern UI
- **⚡ GPU Acceleration**: CUDA support for faster inference

## 📋 Prerequisites

- Python 3.9+
- CUDA-compatible GPU (recommended)
- Conda package manager

## 🛠️ Installation

### 1. Create and Activate Conda Environment
```bash
conda create -n medsam2 python=3.9 -y
conda activate medsam2
```

### 2. Install PyTorch with CUDA Support
```bash
conda install pytorch torchvision torchaudio pytorch-cuda=11.8 -c pytorch -c nvidia
```

### 3. Install Core Dependencies
```bash
pip install git+https://github.com/facebookresearch/segment-anything.git
pip install -r requirements.txt
```

### 4. Download Required Models
```bash
python download_models.py
```

### 5. Verify Installation
```bash
python verify_setup.py
```

## 📁 Project Structure

```
medical-image-analysis/
├── app.py                 # Main Flask application
├── setup_models.py        # Model download and setup utilities
├── requirements.txt       # Python dependencies
├── templates/
│   └── index.html         # Web interface template
├── checkpoints/           # Model storage directory
│   ├── vit_model.pth     # ViT model for TB detection
│   └── [medsam models]   # MedSAM segmentation models
├── results/               # Output directory for processed images
└── static/               # Static web assets (if any)
```

## 🏃‍♂️ Quick Start

### Start the Server
```bash
python med-server.py
```

The server will be available at `http://localhost:5001`

### Web Interface
1. Open your browser and navigate to `http://localhost:5001`
2. Upload a medical image (JPEG, PNG, etc.)
3. Select your desired analysis model:
   - **ViT TB Detection**: For tuberculosis classification with heatmap
   - **MedSAM Models**: For medical image segmentation
4. Click "🚀 Analyze Image" to process

## 🔌 API Usage

### Unified Analysis Endpoint
```bash
curl -X POST \
  -F "file=@path/to/your/image.jpg" \
  -F "model=ViT_TB_Detection" \
  http://localhost:5001/analyze
```

### Dedicated ViT TB Detection
```bash
curl -X POST \
  -F "file=@path/to/chest_xray.jpg" \
  http://localhost:5001/vit_analyze
```

**Example Response:**
```json
{
  "prediction": "TB Detected",
  "confidence": {
    "tb_detected": 0.8542,
    "normal": 0.1458
  },
  "heatmap_image": "base64_encoded_heatmap_image",
  "success": true
}
```

### MedSAM Segmentation
```bash
curl -X POST \
  -F "file=@path/to/medical_image.jpg" \
  -F "model=medsam_model_name" \
  http://localhost:5001/analyze
```

### List Available Models
```bash
curl http://localhost:5001/models
```

**Example Response:**
```json
{
  "segmentation_models": ["model1.pth", "model2.pth"],
  "classification_models": ["ViT_TB_Detection"],
  "device": "cuda"
}
```

## 🧠 Model Details

### Vision Transformer (ViT) for TB Detection
- **Architecture**: `vit_base_patch16_224.augreg2_in21k_ft_in1k`
- **Classes**: Binary classification (Normal vs TB Detected)
- **Input Size**: 224x224 pixels
- **Features**: 
  - Confidence scores for both classes
  - Grad-CAM heatmap visualization
  - Attention-based explanability

### MedSAM2 Segmentation Models
- **Purpose**: Medical image segmentation
- **Output**: Segmentation masks with overlay visualization
- **Supported**: Multiple MedSAM model variants
- **Features**:
  - Precise anatomical structure detection
  - Real-time inference
  - Customizable overlay colors

## ⚙️ Configuration

### Model Paths
Update these paths in `app.py` if needed:
```python
VIT_MODEL_PATH = "checkpoints/vit_model.pth"
CHECKPOINTS_DIR = "checkpoints/"
```

### Server Settings
```python
app.config['MAX_CONTENT_LENGTH'] = 16 * 1024 * 1024  # 16 MB max upload
app.run(host='0.0.0.0', port=5001, debug=True)
```

## 🖼️ Supported Image Formats

- JPEG (.jpg, .jpeg)
- PNG (.png)
- BMP (.bmp)
- TIFF (.tiff, .tif)
- WebP (.webp)

## 🚨 Error Handling

The application includes comprehensive error handling:

- **Model Loading Errors**: Graceful fallback when models are unavailable
- **Image Processing Errors**: Clear error messages for invalid inputs
- **Memory Management**: Automatic cleanup for large images
- **GPU/CPU Fallback**: Automatic device selection based on availability

## 🔧 Troubleshooting

### Common Issues

1. **CUDA Out of Memory**:
   ```bash
   # Reduce batch size or use CPU
   CUDA_VISIBLE_DEVICES="" python app.py
   ```

2. **Model Not Found**:
   ```bash
   # Ensure models are downloaded
   python download_models.py
   ```

3. **Permission Errors**:
   ```bash
   # Create necessary directories
   mkdir -p checkpoints results
   chmod 755 checkpoints results
   ```

### Dependencies Issues
```bash
# Reinstall dependencies
pip install --force-reinstall -r requirements.txt
```

## 📊 Performance Optimization

- **GPU Memory**: Models are loaded once at startup
- **Image Processing**: Efficient preprocessing pipelines
- **Caching**: Results can be cached for repeated analyses
- **Batch Processing**: Support for multiple image analysis

## 🔒 Security Considerations

- File upload size limits (16 MB default)
- Image format validation
- No persistent storage of uploaded images
- Memory cleanup after processing

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- **MedSAM2**: Advanced medical image segmentation
- **timm**: PyTorch Image Models for ViT implementation
- **pytorch-grad-cam**: Gradient-weighted Class Activation Mapping
- **Flask**: Web framework for the server implementation

## 📞 Support

For issues and questions:
1. Check the troubleshooting section
2. Open an issue on GitHub
3. Refer to the API documentation above

---

**🎯 Ready to analyze medical images with state-of-the-art AI models!**