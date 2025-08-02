import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: { 
    outDir: 'build', 
  },
  
  // server: {
  //   proxy: {
  //     '/api': {
  //       target: 'http://localhost:5001/YOUR_PROJECT_ID/YOUR_REGION', // e.g., http://localhost:5001/ar-quote-maker/us-central1
  //       changeOrigin: true,
  //       rewrite: (path) => path.replace(/^\/api/, '/api'),
  //     },
  //   },
  // },
})