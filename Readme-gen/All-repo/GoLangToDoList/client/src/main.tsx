import React from 'react';
import { createRoot } from 'react-dom/client'; // Import createRoot
import App from './App';
import './index.css'; // Import your Tailwind CSS file

// Get the root element
const rootElement = document.getElementById('root');
if (rootElement) {
  const root = createRoot(rootElement); // Create a root

  // Render your App
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
} else {
  console.error('Root element not found');
}
