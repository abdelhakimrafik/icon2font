import path from 'node:path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { viteSingleFile } from 'vite-plugin-singlefile';

export default defineConfig(({ mode }) => {
  const isProduction = mode === 'production';
  return {
    plugins: [react(), viteSingleFile()],
    root: path.resolve('src/ui'),
    build: {
      minify: isProduction,
      cssMinify: isProduction,
      sourcemap: !isProduction ? 'inline' : false,
      emptyOutDir: false,
      cssCodeSplit: false,
      outDir: path.resolve('dist'),
      rollupOptions: {
        input: path.resolve('src/ui/index.html')
      }
    },
    resolve: {
      alias: {
        '@common': path.resolve('src/common'),
        '@ui': path.resolve('src/ui')
      }
    }
  };
});
