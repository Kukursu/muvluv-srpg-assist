import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  publicDir: 'public',   // ← ここで public フォルダを使うと明示
  build: {
    outDir: 'dist',
  },
});
