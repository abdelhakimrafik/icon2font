import { defineConfig } from 'vite';

export default defineConfig({
  test: {
    globals: true,
    css: true,
    environment: 'jsdom',
    setupFiles: './vitest.setup.ts'
  }
});
