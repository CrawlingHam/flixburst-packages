import { defineConfig } from 'tsup';

export default defineConfig({
    entry: ['src/index.ts'],
    format: ['cjs', 'esm'],
    dts: true,
    splitting: false,
    sourcemap: true,
    clean: true,
    minify: false,
    target: 'node18',
    outDir: 'dist',
    esbuildOptions(options) {
        options.banner = {
            js: '"use strict";',
        };
        options.keepNames = true;
        options.charset = 'utf8';
    },
});
