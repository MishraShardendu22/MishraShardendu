import path from 'node:path'
import { svelte } from '@sveltejs/vite-plugin-svelte'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vite'

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
      outDir: 'dist',
      // Use esbuild for minification (built-in, no extra deps)
      minify: 'esbuild',
      // Target modern browsers for smaller bundles
      target: 'es2020',
      // Reduce chunk size warnings threshold
      chunkSizeWarningLimit: 500,
      // Enable CSS code splitting
      cssCodeSplit: true,
      // Enable source maps only for production debugging
      sourcemap: false,
      // Optimize assets - inline small assets
      assetsInlineLimit: 4096,
      rollupOptions: {
        output: {
          // Optimize chunk names for better caching
          chunkFileNames: 'assets/js/[name]-[hash].js',
          entryFileNames: 'assets/js/[name]-[hash].js',
          assetFileNames: (assetInfo) => {
            const name = assetInfo.name || ''
            if (/\.(gif|jpe?g|png|svg|webp|avif)$/i.test(name)) {
              return 'assets/images/[name]-[hash][extname]'
            }
            if (/\.css$/i.test(name)) {
              return 'assets/css/[name]-[hash][extname]'
            }
            if (/\.(woff2?|eot|ttf|otf)$/i.test(name)) {
              return 'assets/fonts/[name]-[hash][extname]'
            }
            return 'assets/[name]-[hash][extname]'
          },
          manualChunks: (id) => {
            // Core Svelte framework
            if (id.includes('node_modules/svelte')) {
              return 'vendor-svelte'
            }
            // Icon libraries - often large, separate chunk
            if (id.includes('lucide-svelte') || id.includes('lucide-react')) {
              return 'vendor-icons'
            }
            // Markdown processing - lazy load
            if (id.includes('marked') || id.includes('dompurify')) {
              return 'vendor-markdown'
            }
            // Analytics - separate chunk
            if (id.includes('@vercel/analytics') || id.includes('@vercel/speed-insights')) {
              return 'vendor-analytics'
            }
            // Other node_modules
            if (id.includes('node_modules')) {
              return 'vendor-common'
            }
          },
        },
      },
    },
    // Optimize dependencies
    optimizeDeps: {
      include: ['svelte', 'marked', 'dompurify'],
      exclude: ['lucide-svelte'],
    },
    // Esbuild options for better minification
    esbuild: {
      legalComments: 'none',
      treeShaking: true,
      drop: ['console', 'debugger'],
    },
  }
})
