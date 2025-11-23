import path from 'path'
import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'

// https://vite.dev/config/
export default defineConfig(() => {
  return {
    base: '/',
    plugins: [svelte(), tailwindcss()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
    appType: 'spa' as const,
    build: {
      outDir: 'dist', // Explicitly set output directory for Vercel
      rollupOptions: {
        output: {
          manualChunks: {
            // Core vendor chunk - Framework
            'vendor-core': ['svelte'],
            // UI components chunk
            'vendor-ui': ['lucide-svelte', 'lucide-react'],
          },
        },
      },
    },
  }
})
