import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    strictPort: true,
  },
  resolve: {
    // @react-three/fiber ships its own React copy — dedupe forces one instance
    dedupe: ['react', 'react-dom'],
  },
})
