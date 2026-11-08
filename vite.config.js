import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'node:path';
export default defineConfig({
  base: './',
  plugins: [react()],
  build: { rollupOptions: { input: {
    landing: resolve('index.html'), a: resolve('a/index.html'), b: resolve('b/index.html'), report: resolve('report/index.html'), experiment: resolve('experiment/index.html'),
  } } },
});
