import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  publicDir: 'public',       // ✅ public/index.html を読む
  build: {
    outDir: 'dist'           // ✅ Vercelがこれを使ってデプロイする
  }
});
