# Pixel Mosaic Lazy Loader

[![npm version](https://img.shields.io/npm/v/@dong-gri/pixel-mosaic-lazy-loader.svg)](https://www.npmjs.com/package/@dong-gri/pixel-mosaic-lazy-loader)
[![npm downloads](https://img.shields.io/npm/dm/@dong-gri/pixel-mosaic-lazy-loader.svg)](https://www.npmjs.com/package/@dong-gri/pixel-mosaic-lazy-loader)
[![license](https://img.shields.io/npm/l/@dong-gri/pixel-mosaic-lazy-loader.svg)](./LICENSE)
![dependencies](https://img.shields.io/badge/dependencies-0-2ea44f)

**English (default)** · [한국어](./docs/readme/README.ko.md) · [日本語](./docs/readme/README.ja.md) · [繁體中文（台灣）](./docs/readme/README.zh-TW.md) · [ไทย](./docs/readme/README.th.md) · [简体中文](./docs/readme/README.zh-CN.md) · [繁體中文](./docs/readme/README.zh-Hant.md) · [Русский](./docs/readme/README.ru.md) · [Italiano](./docs/readme/README.it.md)

Turn any `<img>` into a **large-pixel → smaller-pixel → original image** reveal—without creating separate placeholder files or freezing GIF, Animated WebP, or APNG playback.

![Pixel Mosaic Lazy Loader preview](./docs/readme/example.gif)

[**Live Demo**](https://git.dongri.me/example/pixel-mosaic-live/) · [**npm**](https://www.npmjs.com/package/@dong-gri/pixel-mosaic-lazy-loader) · [**Blog Post**](https://lab.dongri.me/p/pixel-mosaic-lazy-loader)

Current release: **v1.3.4**

## Why Pixel Mosaic Lazy Loader?

- **Zero dependencies** and no separate low-resolution placeholder assets
- Works with static images, GIF, Animated WebP, and APNG
- Preserves animated-image playback through direct decoding or animation-safe fallback
- Automatically detects existing and dynamically inserted images
- Supports global options and per-image `data-*` overrides
- Keeps the original `<img>`, `alt` text, transparency, `border-radius`, `object-fit`, and `object-position`
- Includes reduced-motion handling and progressive fallback for older browsers

## Quick start

### CDN — latest npm release

The URLs below intentionally omit a version, so they always follow the package's current npm `latest` release.

> [!WARNING]
> Publishing a new npm release updates these unversioned CDN URLs automatically. Avoid breaking changes unless you publish a new major version.

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@dong-gri/pixel-mosaic-lazy-loader/dist/pixel-mosaic.min.css">

<img
  data-pixel-mosaic
  src="/images/example.gif"
  width="1280"
  height="720"
  alt="Animated product preview"
>

<script src="https://cdn.jsdelivr.net/npm/@dong-gri/pixel-mosaic-lazy-loader/dist/pixel-mosaic.min.js"></script>
<script>
  PixelMosaic.init({
    duration: 1600,
    startDelay: 100,
    steps: 'auto',
    stepCount: 8
  });
</script>
```

### npm

```bash
npm install @dong-gri/pixel-mosaic-lazy-loader
```

```js
import PixelMosaic from '@dong-gri/pixel-mosaic-lazy-loader';
import '@dong-gri/pixel-mosaic-lazy-loader/style.css';

const mosaic = PixelMosaic.init({
  duration: 1600,
  startDelay: 100,
  steps: 'auto',
  stepCount: 8
});
```

## CDN files

### jsDelivr

- Minified JavaScript: `https://cdn.jsdelivr.net/npm/@dong-gri/pixel-mosaic-lazy-loader/dist/pixel-mosaic.min.js`
- Minified ES module: `https://cdn.jsdelivr.net/npm/@dong-gri/pixel-mosaic-lazy-loader/dist/pixel-mosaic.min.mjs`
- Minified CSS: `https://cdn.jsdelivr.net/npm/@dong-gri/pixel-mosaic-lazy-loader/dist/pixel-mosaic.min.css`
- Readable JavaScript: `https://cdn.jsdelivr.net/npm/@dong-gri/pixel-mosaic-lazy-loader/dist/pixel-mosaic.js`
- Readable ES module: `https://cdn.jsdelivr.net/npm/@dong-gri/pixel-mosaic-lazy-loader/dist/pixel-mosaic.mjs`
- Readable CSS: `https://cdn.jsdelivr.net/npm/@dong-gri/pixel-mosaic-lazy-loader/dist/pixel-mosaic.css`

### unpkg

- Minified JavaScript: `https://unpkg.com/@dong-gri/pixel-mosaic-lazy-loader/dist/pixel-mosaic.min.js`
- Minified ES module: `https://unpkg.com/@dong-gri/pixel-mosaic-lazy-loader/dist/pixel-mosaic.min.mjs`
- Minified CSS: `https://unpkg.com/@dong-gri/pixel-mosaic-lazy-loader/dist/pixel-mosaic.min.css`

## Basic usage

Add `data-pixel-mosaic` to an image, then initialize the library.

```html
<img
  data-pixel-mosaic
  src="/images/hero.jpg"
  width="1280"
  height="720"
  alt="Product dashboard"
>
```

```js
const mosaic = PixelMosaic.init({
  autoDetect: true,
  autoSelector: 'main img:not([data-no-pixel-mosaic])',
  duration: 1400,
  startDelay: 100,
  steps: 'auto',
  stepCount: 8,
  fadePortion: 0,
  maxConcurrent: 2,
  quality: 'auto',
  noise: {
    enabled: true,
    opacity: 0.14,
    fps: 20,
    monochrome: true,
    blendMode: 'soft-light'
  }
});
```

## Pixel steps

Use `steps: 'auto'` with `stepCount` for simple settings, or provide explicit pixel sizes for advanced control.

```js
PixelMosaic.init({
  duration: 1600,
  steps: [64, 40, 24, 14, 8, 4, 2]
});
```

## Per-image settings

HTML data attributes override global options for a specific image.

```html
<img
  data-pixel-mosaic
  data-pm-duration="1900"
  data-pm-start-delay="700"
  data-pm-steps="auto"
  data-pm-step-count="5"
  data-pm-noise="0.16"
  data-pm-animated="true"
  src="/images/animation.webp"
  alt="Animated preview"
>
```

## Animated images

When `ImageDecoder` and the codec are available, frames are decoded and pixelated directly. Otherwise, the original animation keeps playing while a Canvas mosaic is composited over it. If Canvas is unavailable, the original image remains visible through the CSS fallback.

## Browser and device guidance

### Minimum browser support

Chrome/Edge 80+, Firefox 74+, Safari 13.1+, iOS Safari 13.4+, Samsung Internet 13+, Android WebView 80+. Internet Explorer is not supported.

### Recommended environment

Use one of the latest two major versions of Chrome, Edge, Firefox, or Safari over HTTPS. Full frame-by-frame animated mosaic depends on `ImageDecoder`, codec availability, CORS, and the browser implementation.

### Performance guidance

For conservative minimum settings, use a 2-core CPU, 2 GB RAM, images up to 1280×720, `maxConcurrent: 1`, and noise at 12 fps or less. For smoother use, a 4-core CPU, 4 GB RAM, images up to 1920×1080, `maxConcurrent: 2`, and noise at 20–24 fps are recommended. Actual load is primarily determined by pixel count, DPR, concurrent images, and noise FPS.

### Progressive fallback

- `ImageDecoder` available: direct frame decoding for animated mosaic
- Canvas available: static mosaic and animation-preserving Canvas composition
- Canvas unavailable: CSS transition fallback
- `prefers-reduced-motion: reduce`: skip the effect and show the original immediately

## Accessibility and performance

- The original `<img>` and `alt` text remain in the document
- Canvas overlays are hidden from assistive technology and do not intercept pointer events
- Set image `width` and `height` to reduce layout shifts
- `quality: 'auto'` considers Save-Data, device memory, CPU threads, and pointer type
- Cross-origin animated-frame decoding requires appropriate CORS headers; playback-preserving fallback still works without them

## API

```js
const mosaic = PixelMosaic.init(options);

mosaic.scan(document.querySelector('.new-content'));
mosaic.play(document.querySelector('#hero-image'));
mosaic.replay(document.querySelector('.gallery'));
mosaic.destroy();
```

## Main options

| Option | Default | Description |
|---|---:|---|
| `duration` | `1250` | Pixel transition duration in milliseconds |
| `startDelay` | `100` | Time to hold the first mosaic state before transition |
| `steps` | `'auto'` | Automatic steps or an array of pixel sizes |
| `stepCount` | `8` | Number of automatically generated steps |
| `fadePortion` | `0` | Canvas crossfade ratio; zero switches directly to the original |
| `maxConcurrent` | `3` | Maximum images processed at once |
| `quality` | `'auto'` | `auto`, `low`, `balanced`, or `high` |
| `animatedMode` | `'auto'` | `auto`, `decode`, or `preserve` |
| `respectReducedMotion` | `true` | Honor reduced-motion preferences |

## Demo languages

The public demo supports Korean, English, Japanese, Traditional Chinese for Taiwan, Thai, Simplified Chinese, Traditional Chinese, Russian, and Italian. It detects the browser language, remembers the selection, and accepts `?lang=en`, `?lang=ja`, and other locale parameters.

## Limitations

- Complex transforms, masks, or multi-layer `clip-path` combinations may not align perfectly with the Canvas overlay
- Cross-origin Animated WebP/APNG detection and direct decoding require CORS access
- Animated-image capabilities vary by browser, so animation-preserving fallback is always included

## License

MIT License.
