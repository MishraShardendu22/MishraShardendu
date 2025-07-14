import { BrowserRouter } from 'react-router-dom';
import { createRoot } from 'react-dom/client';
import { Toaster } from 'react-hot-toast';
import { Provider } from 'react-redux';
import store from './Redux/store.ts';
import App from './App.tsx';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <BrowserRouter>
      <Toaster
        position="top-left"
        reverseOrder={true}
        toastOptions={{ duration: 5000 }}
      />
      <App />
    </BrowserRouter>
  </Provider>
);
