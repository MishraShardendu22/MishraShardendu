import requests

# Upload and analyze an image
files = {'image': open('/home/mayank/Downloads/ct_lesion-negative.png', 'rb')}
data = {'model_type': 'ct_lesion'}

response = requests.post('http://localhost:5100/analyze', files=files, data=data)
result = response.json()

if result.get('success'):
    print(f"Analysis completed!")
    print(f"Found {result['num_segments']} segments")
    print(f"Processing time: {result['processing_time']}")
    
    # Masks are returned as base64 encoded images
    for i, mask in enumerate(result['masks']):
        print(f"Segment {i+1} score: {result['scores'][i]:.3f}")
else:
    print(f"Error: {result.get('error')}")