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
          manualChunks: {
            // Core vendor chunk - Framework and routing
            'vendor-core': ['preact', 'preact/hooks', 'preact-router', 'preact/compat'],
            // UI components chunk - Radix UI components
            'vendor-ui': [
              '@radix-ui/react-alert-dialog',
              '@radix-ui/react-checkbox',
              '@radix-ui/react-dialog',
              '@radix-ui/react-label',
              '@radix-ui/react-popover',
              '@radix-ui/react-tabs',
              '@radix-ui/react-tooltip',
              'lucide-react',
            ],
            // Form and validation chunk
            'vendor-forms': ['react-hook-form', '@hookform/resolvers', 'zod'],
            // DnD and utilities chunk
            'vendor-utils': [
              '@dnd-kit/core',
              '@dnd-kit/sortable',
              '@dnd-kit/utilities',
              'axios',
              'react-hot-toast',
              'react-markdown',
            ],
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
          configure: (proxy: any, _options: any) => {
            proxy.on('error', (err: any, _req: any, _res: any) => {
              console.error('proxy error', err)
            })
            proxy.on('proxyReq', (_proxyReq: any, _req: any, _res: any) => {})
            proxy.on('proxyRes', (_proxyRes: any, _req: any, _res: any) => {})
          },
        },
      },
    },
  }
})
