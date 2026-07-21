# Pixel Mosaic Lazy Loader

[![npm version](https://img.shields.io/npm/v/@dong-gri/pixel-mosaic-lazy-loader.svg)](https://www.npmjs.com/package/@dong-gri/pixel-mosaic-lazy-loader)
[![npm downloads](https://img.shields.io/npm/dm/@dong-gri/pixel-mosaic-lazy-loader.svg)](https://www.npmjs.com/package/@dong-gri/pixel-mosaic-lazy-loader)
[![license](https://img.shields.io/npm/l/@dong-gri/pixel-mosaic-lazy-loader.svg)](../../LICENSE)
![dependencies](https://img.shields.io/badge/dependencies-0-2ea44f)

[English (default)](../../README.md) · [한국어](./README.ko.md) · [日本語](./README.ja.md) · **繁體中文（台灣）** · [ไทย](./README.th.md) · [简体中文](./README.zh-CN.md) · [繁體中文](./README.zh-Hant.md) · [Русский](./README.ru.md) · [Italiano](./README.it.md)

不需要另外準備低解析度預留圖，即可讓圖片從 **大像素 → 小像素 → 原始圖片** 顯示，並維持 GIF、Animated WebP 與 APNG 播放。

![Pixel Mosaic Lazy Loader preview](./example.gif)

[**Live Demo**](https://git.dongri.me/example/pixel-mosaic-live/) · [**npm**](https://www.npmjs.com/package/@dong-gri/pixel-mosaic-lazy-loader) · [**Blog Post**](https://lab.dongri.me/p/pixel-mosaic-lazy-loader)

目前版本: **v1.3.4**

## 為什麼使用 Pixel Mosaic Lazy Loader？

- 零相依，不需要額外的低解析度圖片
- 支援靜態圖片、GIF、Animated WebP 與 APNG
- 自動偵測動態加入的圖片
- 針對無障礙與低效能環境提供分級降級

## 快速開始

### npm

可在 Vite、webpack、Parcel 等支援 ESM 的建置環境中使用。

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

### jsDelivr CDN

公開發佈到 npm 後，相同檔案會自動由 jsDelivr 提供。

下列 CDN 網址省略版本，會自動使用 npm 目前的 `latest` 版本。

> [!WARNING]
> 發佈新的 npm 版本後，未指定版本的 CDN 網址也會自動更新。

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@dong-gri/pixel-mosaic-lazy-loader/dist/pixel-mosaic.css">
<script src="https://cdn.jsdelivr.net/npm/@dong-gri/pixel-mosaic-lazy-loader/dist/pixel-mosaic.js"></script>
<script>
  PixelMosaic.init({
    duration: 1600,
    startDelay: 100,
    steps: 'auto',
    stepCount: 8
  });
</script>
```

#### Minified CDN 檔案

正式環境若不需要可讀原始碼，可使用下列較小的壓縮檔案。

**jsDelivr**

- JavaScript: `https://cdn.jsdelivr.net/npm/@dong-gri/pixel-mosaic-lazy-loader/dist/pixel-mosaic.min.js`
- ES Module: `https://cdn.jsdelivr.net/npm/@dong-gri/pixel-mosaic-lazy-loader/dist/pixel-mosaic.min.mjs`
- CSS: `https://cdn.jsdelivr.net/npm/@dong-gri/pixel-mosaic-lazy-loader/dist/pixel-mosaic.min.css`

**unpkg**

- JavaScript: `https://unpkg.com/@dong-gri/pixel-mosaic-lazy-loader/dist/pixel-mosaic.min.js`
- ES Module: `https://unpkg.com/@dong-gri/pixel-mosaic-lazy-loader/dist/pixel-mosaic.min.mjs`
- CSS: `https://unpkg.com/@dong-gri/pixel-mosaic-lazy-loader/dist/pixel-mosaic.min.css`

### CDN ES Module

```html
<script type="module">
  import PixelMosaic from 'https://cdn.jsdelivr.net/npm/@dong-gri/pixel-mosaic-lazy-loader/dist/pixel-mosaic.mjs';

  PixelMosaic.init({
    duration: 1600,
    startDelay: 100,
    steps: 'auto',
    stepCount: 8
  });
</script>
```

### unpkg CDN

unpkg 會自動鏡像所有公開 npm 套件；新版本可能需要幾分鐘才會出現。

```html
<link rel="stylesheet" href="https://unpkg.com/@dong-gri/pixel-mosaic-lazy-loader/dist/pixel-mosaic.css">
<script src="https://unpkg.com/@dong-gri/pixel-mosaic-lazy-loader/dist/pixel-mosaic.js"></script>
```

## 主要功能

- 自動偵測圖片，包含頁面載入後新增的圖片
- 支援簡單的階段數設定與自訂像素尺寸陣列
- 可設定轉場時間與開始延遲
- 類似 Photoshop 雜訊的即時動態顆粒
- 維持 GIF、Animated WebP、APNG 的播放
- 漸進增強與分級降級處理
- 針對行動裝置與低階設備的效能控制
- 支援 `prefers-reduced-motion` 等無障礙設定
- 支援 `border-radius`、透明度、`object-fit`、`object-position`

## 基本用法

在圖片加上 `data-pixel-mosaic`，再初始化套件。

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

## 像素階段

簡單設定可使用 `steps: 'auto'` 搭配 `stepCount`；需要精細控制時可直接指定像素尺寸陣列。

```js
PixelMosaic.init({
  duration: 1600,
  steps: [64, 40, 24, 14, 8, 4, 2]
});
```

## 單張圖片設定

透過 HTML data 屬性，可只覆寫特定圖片的全域設定。

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

## 動畫圖片

若瀏覽器可使用 `ImageDecoder` 與對應編碼，會直接解碼每個影格並像素化；否則會維持原始動畫播放，並在上方合成 Canvas 馬賽克。Canvas 不可用時仍會透過 CSS 降級保留原圖。

## 瀏覽器與裝置建議

### 最低支援瀏覽器

Chrome/Edge 80+、Firefox 74+、Safari 13.1+、iOS Safari 13.4+、Samsung Internet 13+、Android WebView 80+。不支援 Internet Explorer。

### 建議環境

建議在 HTTPS 使用 Chrome、Edge、Firefox、Safari 最新兩個主要版本。逐影格動畫馬賽克取決於 `ImageDecoder`、編碼支援、CORS 與瀏覽器實作。

### 效能建議

保守的最低設定為 2 核心 CPU、2 GB 記憶體、1280×720 以下圖片、`maxConcurrent: 1`、雜訊 12fps 以下。較順暢的建議為 4 核心 CPU、4 GB 記憶體、1920×1080 以下、`maxConcurrent: 2`、雜訊 20～24fps。實際負載主要取決於像素數、DPR、同時執行的圖片數與雜訊 FPS。

### 漸進式降級

- 可用 `ImageDecoder`：直接解碼動畫影格
- 可用 Canvas：靜態馬賽克與維持動畫播放的合成
- 無 Canvas：CSS 轉場降級
- `prefers-reduced-motion: reduce`：略過效果並立即顯示原圖

## 無障礙與效能

- 保留原始 `<img>` 與 `alt` 文字
- Canvas 覆蓋層對輔助技術隱藏，且不攔截指標事件
- 建議設定圖片 `width` 與 `height` 以減少版面位移
- `quality: 'auto'` 會參考 Save-Data、裝置記憶體、CPU 執行緒與指標類型
- 跨來源動畫直接解碼需要 CORS，但維持播放的降級模式不需要 CORS

## API

```js
const mosaic = PixelMosaic.init(options);

mosaic.scan(document.querySelector('.new-content'));
mosaic.play(document.querySelector('#hero-image'));
mosaic.replay(document.querySelector('.gallery'));
mosaic.destroy();
```

## 主要選項

| 選項 | 預設值 | 說明 |
|---|---:|---|
| `duration` | `1250` | 像素轉場時間（毫秒） |
| `startDelay` | `100` | 維持第一個馬賽克狀態的時間 |
| `steps` | `'auto'` | 自動階段或像素尺寸陣列 |
| `stepCount` | `8` | 自動產生的階段數 |
| `fadePortion` | `0` | Canvas 淡出比例；0 會直接切換原圖 |
| `maxConcurrent` | `3` | 同時處理的圖片數 |
| `quality` | `'auto'` | `auto`、`low`、`balanced`、`high` |
| `animatedMode` | `'auto'` | `auto`、`decode`、`preserve` |
| `respectReducedMotion` | `true` | 遵循減少動態效果設定 |

## 示範頁支援語言

公開示範支援韓文、英文、日文、台灣繁體中文、泰文、簡體中文、繁體中文、俄文與義大利文。可自動偵測瀏覽器語言、記住選擇，並支援 `?lang=en` 等網址參數。

## 限制

- 複雜 transform、遮罩或多層 `clip-path` 可能無法與 Canvas 完全對齊
- 跨來源 Animated WebP/APNG 的偵測與直接解碼需要 CORS
- 各瀏覽器動畫能力不同，因此內建維持播放的降級模式

## 授權

MIT © [dongri.me](https://dongri.me) · 以 AI 氛圍編程（vibe coding）打造。
