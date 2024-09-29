import path from 'node:path';
import { defineConfig } from 'vite';
import generateFile from 'vite-plugin-generate-file';
import { viteSingleFile } from 'vite-plugin-singlefile';
import figmaManifest from './manifest';

export default defineConfig(({ mode }) => {
  const isProduction = mode === 'production';
  return {
    plugins: [
      viteSingleFile(),
      generateFile({
        type: 'json',
        output: './manifest.json',
        data: figmaManifest
      })
    ],
    build: {
      minify: isProduction,
      sourcemap: !isProduction ? 'inline' : false,
      target: 'esnext',
      emptyOutDir: false,
      outDir: path.resolve('dist'),
      rollupOptions: {
        input: path.resolve('src/plugin/index.ts'),
        output: {
          entryFileNames: 'plugin.js'
        }
      }
    },
    resolve: {
      alias: {
        '@common': path.resolve('src/common'),
        '@plugin': path.resolve('src/plugin')
      }
    }
  };
});
