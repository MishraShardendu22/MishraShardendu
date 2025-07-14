import { BrowserRouter } from "react-router-dom";
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

createRoot(document.getElementById('root')!).render(
  <div className='dark'>
  <BrowserRouter>
      <App />
  </BrowserRouter>
  </div>
  
)
