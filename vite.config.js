import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  root: 'src', // ← エントリを src/ にする
  publicDir: '../public', // ← public フォルダのパスを正しく認識させる
  plugins: [react()],
  build: {
    outDir: '../dist', // ← dist をプロジェクト直下に置く
    emptyOutDir: true,  // ← 古いビルドをクリア（おすすめ）
  },
});
