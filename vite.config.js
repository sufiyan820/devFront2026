import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173, // Matches backend CORS configuration
    strictPort: false, // Allow fallback to next available port if 5173 is busy
    proxy: {
      '/api': {
        target: '13.60.84.8',
        changeOrigin: true,
      }
    }
  }
})
