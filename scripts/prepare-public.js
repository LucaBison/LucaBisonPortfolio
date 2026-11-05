const fs = require('node:fs');
const path = require('node:path');

const publicDirectory = path.resolve(__dirname, '../public');
const outputDirectory = path.resolve(__dirname, '../dist/client');

fs.rmSync(outputDirectory, { recursive: true, force: true });
fs.mkdirSync(path.dirname(outputDirectory), { recursive: true });
fs.cpSync(publicDirectory, outputDirectory, { recursive: true });
