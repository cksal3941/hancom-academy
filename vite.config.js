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
  optimizeDeps: {
    // dynamic import로만 쓰여 늦게 발견되면 dev 서버가 중간에 재최적화하며
    // 모듈 로드가 끊기므로 미리 번들에 포함시킨다
    include: ['@shadergradient/react'],
  },
  build: {
    rolldownOptions: {
      output: {
        manualChunks(id) {
          // three/@shadergradient는 AcademyIntroShader의 dynamic import로만 쓰이므로
          // 강제 청크 지정 없이 lazy 청크에 자연 포함되도록 둔다
          if (id.includes('node_modules/firebase')) {
            return 'firebase'
          }
          if (id.includes('node_modules/swiper')) {
            return 'swiper'
          }
        },
      },
    },
  },
})
