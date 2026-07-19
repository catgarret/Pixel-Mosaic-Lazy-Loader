import { copyFile, mkdir, readFile, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { minify } from 'terser';
import CleanCSS from 'clean-css';

const root = resolve(import.meta.dirname, '..');
const dist = resolve(root, 'dist');
const sourcePath = resolve(root, 'pixel-mosaic.js');
const cssPath = resolve(root, 'pixel-mosaic.css');

await mkdir(dist, { recursive: true });
const source = await readFile(sourcePath, 'utf8');
const css = await readFile(cssPath, 'utf8');

const opening = '(function (global) {';
const closing = '\n  global.PixelMosaic = api;\n})(window);';
const openingIndex = source.indexOf(opening);
const closingIndex = source.lastIndexOf(closing);

if (openingIndex < 0 || closingIndex < 0) {
  throw new Error('Unexpected pixel-mosaic.js wrapper. ESM build was not generated.');
}

const banner = source.slice(0, openingIndex).trimEnd();
const body = source
  .slice(openingIndex + opening.length, closingIndex)
  .replace(/^\n/, '')
  .replace(/^  /gm, '');

const esm = `${banner}\n/* ESM browser build */\nconst global = window;\n${body}\n\nconst PixelMosaic = api;\nconst init = api.init.bind(api);\nconst support = api.support;\nconst defaults = api.defaults;\nconst version = api.version;\n\nexport { PixelMosaic, init, support, defaults, version };\nexport default PixelMosaic;\n`;

const minifyOptions = {
  compress: { passes: 2 },
  mangle: true,
  format: { comments: /^!/ }
};

const minifiedIife = await minify(source, minifyOptions);
const minifiedEsm = await minify(esm, { ...minifyOptions, module: true });
const minifiedCss = new CleanCSS({ level: 2 }).minify(css);

if (!minifiedIife.code || !minifiedEsm.code) {
  throw new Error('JavaScript minification failed.');
}
if (minifiedCss.errors.length) {
  throw new Error(`CSS minification failed: ${minifiedCss.errors.join(', ')}`);
}

await writeFile(resolve(dist, 'pixel-mosaic.js'), source);
await writeFile(resolve(dist, 'pixel-mosaic.mjs'), esm);
await copyFile(cssPath, resolve(dist, 'pixel-mosaic.css'));
await writeFile(resolve(dist, 'pixel-mosaic.min.js'), `${minifiedIife.code}\n`);
await writeFile(resolve(dist, 'pixel-mosaic.min.mjs'), `${minifiedEsm.code}\n`);
await writeFile(resolve(dist, 'pixel-mosaic.min.css'), `${minifiedCss.styles}\n`);

console.log('Built regular and minified IIFE, ESM, and CSS files in dist/.');
