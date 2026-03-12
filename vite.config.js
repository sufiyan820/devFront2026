import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"

export default defineConfig({
  plugins: [react()],

  server: {
    host: "0.0.0.0",     // allow access from EC2 public IP
    port: 5173,
    strictPort: false,

    proxy: {
      "/api": {
        target: "http://13.60.84.8:8080",   // backend server
        changeOrigin: true,
        secure: false
      }
    }
  }
})