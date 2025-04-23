import { fileURLToPath } from 'url';
import path from 'path';
import fs from 'fs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.join(__dirname, '..');

// Create package.json for CJS
const cjsPackageJson = {
    type: 'commonjs',
    main: './index.js',
    types: '../types/index.d.ts',
};

// Create package.json for ESM
const esmPackageJson = {
    type: 'module',
    main: './index.js',
    types: '../types/index.d.ts',
};

// Ensure dist directories exist
fs.mkdirSync(path.join(rootDir, 'dist/cjs'), { recursive: true });
fs.mkdirSync(path.join(rootDir, 'dist/esm'), { recursive: true });

// Write the package.json files
fs.writeFileSync(
    path.join(rootDir, 'dist/cjs/package.json'),
    JSON.stringify(cjsPackageJson, null, 2),
);

fs.writeFileSync(
    path.join(rootDir, 'dist/esm/package.json'),
    JSON.stringify(esmPackageJson, null, 2),
);
