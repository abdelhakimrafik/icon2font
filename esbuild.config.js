import esbuild from 'esbuild';
import resolve from 'esbuild-plugin-resolve';

esbuild.build({
  entryPoints: ['src/core/main.ts'],
  bundle: true,
  outfile: 'dist/main.js',
  plugins: [
    resolve({
      stream: import('stream-browserify'),
      buffer: import('buffer'),
      punycode: import('punycode')
    })
  ]
});
