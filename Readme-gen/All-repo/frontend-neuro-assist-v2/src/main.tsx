import './index.css';
import App from './App.tsx';
import { StrictMode } from 'react';
import { Toaster } from 'react-hot-toast';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Toaster position="top-left" reverseOrder={true} />
      <App />
    </BrowserRouter>
  </StrictMode>
);