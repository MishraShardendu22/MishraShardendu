import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  root: 'test',
  plugins: [react()],
  resolve: {
    alias: {
      react: new URL('node_modules/react', import.meta.url).pathname,
      'react-dom': new URL('node_modules/react-dom', import.meta.url).pathname,
    }
  }
});
