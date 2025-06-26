import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  root: '.', // プロジェクト直下に合わせる
  publicDir: 'public',
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: 'public/index.html'
    }
  },
});
