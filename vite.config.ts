import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    // 청크 크기 최적화
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      output: {
        // 벤더 라이브러리 청크 분리
        manualChunks: {
          vendor: ["react", "react-dom"],
          animations: ["gsap", "framer-motion"],
        },
      },
    },
    // 소스맵 최적화 (프로덕션에서는 false)
    sourcemap: false,
    // 기본 압축 사용 (esbuild)
    minify: "esbuild",
  },
  // 개발 서버 최적화
  server: {
    hmr: {
      overlay: false,
    },
  },
  // 모듈 해상도 최적화
  resolve: {
    alias: {
      "@": "/src",
    },
  },
});
