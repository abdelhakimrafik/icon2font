import esbuild from 'esbuild';

esbuild.build({
  entryPoints: ['src/core/main.ts'],
  bundle: true,
  outfile: 'dist/main.js'
});
