import { defineConfig } from 'vite';
import fs from 'fs';
import path from 'path';

export default defineConfig({
  base: '/test-aboratory-internet/',
  server: {
    port: 5173,
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true
      }
    }
  },
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: 'index.html'
    }
  },
  plugins: [
    {
      name: 'nojekyll',
      writeBundle() {
        fs.writeFileSync(path.join(__dirname, 'dist', '.nojekyll'), '');
      }
    }
  ]
});
