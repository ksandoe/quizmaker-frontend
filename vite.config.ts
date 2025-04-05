import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import envPlugin from './vite-env-plugin'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    envPlugin()
  ],
  build: {
    sourcemap: false,
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true
      }
    },
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          supabase: ['@supabase/supabase-js']
        }
      }
    }
  },
  envPrefix: 'VITE_',
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  }
})
