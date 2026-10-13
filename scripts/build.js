'use strict';

// A tiny "build" step: copies src/ into dist/.
// Real projects would compile or bundle here; this gives the pipeline something to build.
const fs = require('node:fs');
const path = require('node:path');

const root = path.join(__dirname, '..');
const dist = path.join(root, 'dist');

fs.rmSync(dist, { recursive: true, force: true });
fs.cpSync(path.join(root, 'src'), dist, { recursive: true });

console.log('Build complete: dist/');
