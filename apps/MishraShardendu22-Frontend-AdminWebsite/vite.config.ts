import path from 'node:path'
import preact from '@preact/preset-vite'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig, loadEnv } from 'vite'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')

  return {
    base: '/',
    plugins: [preact(), tailwindcss()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
    build: {
      rollupOptions: {
        output: {
          chunkFileNames: 'assets/js/[name]-[hash].js',
          entryFileNames: 'assets/js/[name]-[hash].js',
          assetFileNames: (assetInfo) => {
            const name = assetInfo.name || ''
            if (/\.(gif|jpe?g|png|svg|webp|avif)$/i.test(name))
              return 'assets/images/[name]-[hash][extname]'
            if (/\.css$/i.test(name)) return 'assets/css/[name]-[hash][extname]'
            if (/\.(woff2?|eot|ttf|otf)$/i.test(name)) return 'assets/fonts/[name]-[hash][extname]'
            return 'assets/[name]-[hash][extname]'
          },
          manualChunks: (id) => {
            // Core vendor chunk - Framework and routing
            if (id.includes('preact') || id.includes('preact-router')) {
              return 'vendor-core'
            }
            // UI components chunk - Radix UI components
            if (id.includes('@radix-ui') || id.includes('lucide-react')) {
              return 'vendor-ui'
            }
            // Form and validation chunk
            if (id.includes('react-hook-form') || id.includes('@hookform') || id.includes('zod')) {
              return 'vendor-forms'
            }
            // DnD and utilities chunk
            if (
              id.includes('@dnd-kit') ||
              id.includes('axios') ||
              id.includes('react-hot-toast') ||
              id.includes('react-markdown')
            ) {
              return 'vendor-utils'
            }
          },
        },
      },
      // Increase the chunk size warning limit to 600 KB
      chunkSizeWarningLimit: 600,
      // Enable CSS code splitting for smaller initial load
      cssCodeSplit: true,
      // Inline small assets under 4KB as base64
      assetsInlineLimit: 4096,
      // Minify with esbuild for production
      minify: 'esbuild',
      target: 'es2020',
      sourcemap: false,
      // Esbuild options for better minification
      esbuild: {
        legalComments: 'none',
        treeShaking: true,
        drop: ['console', 'debugger'],
      },
    },
    server: {
      proxy: {
        '/api': {
          target: env.VITE_BACKEND_1 || 'https://portfolio-backend-2iw4.onrender.com',
          changeOrigin: true,
          configure: (proxy: { on: (event: string, cb: (...args: unknown[]) => void) => void }) => {
            proxy.on('error', (err: unknown) => {
              console.error('proxy error', err)
            })
            proxy.on('proxyReq', () => {})
            proxy.on('proxyRes', () => {})
          },
        },
      },
    },
  }
})
