/* eslint-disable @typescript-eslint/no-explicit-any */
import { PickerOverlay } from 'filestack-react';

const FileStack = () => {
  const apiKey = import.meta.env.VITE_FILESTACK_API_KEY as string;

  if (!apiKey) {
    return <div>FileStack API Key not found!</div>;
  }

  const options = {
    accept: [
      '.pdf',
      '.doc',
      '.csv',
      '.ppt',
      '.txt',
      '.xls',
      '.pptx',
      '.docx',
      '.xlsx',
      'image/*',
      'video/*',
      'image/png',
      'image/jpeg',
    ],
    fromSources: ['url', 'camera', 'local_file_system'],
    transformations: {
      crop: true,
      circle: true,
      rotate: true,
    },
    maxFiles: 5,
    storeTo: {
      location: 's3',
    },
  };

  const onSuccess = (result: any) => {
    console.log('Upload success:', result);
  };

  const onError = (error: any) => {
    console.error('Upload error:', error);
  };

  return (
    <div>
      <PickerOverlay
        apikey={apiKey}
        onError={onError}
        onSuccess={onSuccess}
        pickerOptions={options}
      />
    </div>
  );
};

export default FileStack;