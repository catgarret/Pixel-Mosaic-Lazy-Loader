# Pixel Mosaic Lazy Loader

[![npm version](https://img.shields.io/npm/v/@dong-gri/pixel-mosaic-lazy-loader.svg)](https://www.npmjs.com/package/@dong-gri/pixel-mosaic-lazy-loader)
[![npm downloads](https://img.shields.io/npm/dm/@dong-gri/pixel-mosaic-lazy-loader.svg)](https://www.npmjs.com/package/@dong-gri/pixel-mosaic-lazy-loader)
[![license](https://img.shields.io/npm/l/@dong-gri/pixel-mosaic-lazy-loader.svg)](../../LICENSE)
![dependencies](https://img.shields.io/badge/dependencies-0-2ea44f)

[English (default)](../../README.md) · [한국어](./README.ko.md) · [日本語](./README.ja.md) · [繁體中文（台灣）](./README.zh-TW.md) · [ไทย](./README.th.md) · [简体中文](./README.zh-CN.md) · **繁體中文** · [Русский](./README.ru.md) · [Italiano](./README.it.md)

毋須另行製作低解像度預留圖，即可讓圖片由 **大像素 → 小像素 → 原圖** 顯示，並維持 GIF、Animated WebP 及 APNG 播放。

![Pixel Mosaic Lazy Loader preview](./example.gif)

[**Live Demo**](https://git.dongri.me/example/pixel-mosaic-live/) · [**npm**](https://www.npmjs.com/package/@dong-gri/pixel-mosaic-lazy-loader) · [**Blog Post**](https://lab.dongri.me/p/pixel-mosaic-lazy-loader)

目前版本: **v1.3.4**

## 為何使用 Pixel Mosaic Lazy Loader？

- 零依賴，毋須額外低解像度圖片
- 支援靜態圖片、GIF、Animated WebP 及 APNG
- 自動偵測動態加入的圖片
- 為無障礙及低效能環境提供分級降級

## 快速開始

### npm

可在 Vite、webpack、Parcel 等支援 ESM 的建置環境使用。

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

公開發佈到 npm 後，相同檔案會自動經 jsDelivr 提供。

以下 CDN 網址省略版本，會自動使用 npm 目前的 `latest` 版本。

> [!WARNING]
> 發佈新的 npm 版本後，未指定版本的 CDN 網址亦會自動更新。

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

正式環境若不需要可讀原始碼，可使用下列體積較小的壓縮檔案。

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

unpkg 會自動鏡像所有公開 npm 套件；新版本可能需要數分鐘才會出現。

```html
<link rel="stylesheet" href="https://unpkg.com/@dong-gri/pixel-mosaic-lazy-loader/dist/pixel-mosaic.css">
<script src="https://unpkg.com/@dong-gri/pixel-mosaic-lazy-loader/dist/pixel-mosaic.js"></script>
```

## 主要功能

- 自動偵測圖片，包括頁面載入後新增的圖片
- 支援簡單階段數及自訂像素尺寸陣列
- 可設定過渡時間及開始延遲
- 類似 Photoshop 雜訊的實時動態顆粒
- 保持 GIF、Animated WebP 及 APNG 播放
- 漸進增強及分級降級
- 為流動裝置及低效能裝置提供效能控制
- 支援 `prefers-reduced-motion` 等無障礙設定
- 支援 `border-radius`、透明度、`object-fit`、`object-position`

## 基本用法

在圖片加入 `data-pixel-mosaic`，然後初始化套件。

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

簡單設定可使用 `steps: 'auto'` 配合 `stepCount`；需要細緻控制時可直接指定像素尺寸陣列。

```js
PixelMosaic.init({
  duration: 1600,
  steps: [64, 40, 24, 14, 8, 4, 2]
});
```

## 個別圖片設定

HTML data 屬性可只覆寫指定圖片的全域設定。

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

若瀏覽器支援 `ImageDecoder` 及對應編碼，會直接解碼每個影格並像素化；否則會保持原動畫播放並疊加 Canvas 馬賽克。Canvas 不可用時仍會透過 CSS 降級顯示原圖。

## 瀏覽器及裝置建議

### 最低支援瀏覽器

Chrome/Edge 80+、Firefox 74+、Safari 13.1+、iOS Safari 13.4+、Samsung Internet 13+、Android WebView 80+。不支援 Internet Explorer。

### 建議環境

建議在 HTTPS 使用 Chrome、Edge、Firefox、Safari 最新兩個主要版本。逐影格動畫馬賽克取決於 `ImageDecoder`、編碼、CORS 及瀏覽器實作。

### 效能建議

保守最低設定為 2 核 CPU、2 GB 記憶體、1280×720 以下圖片、`maxConcurrent: 1`、雜訊 12fps 以下。流暢使用建議 4 核 CPU、4 GB 記憶體、1920×1080 以下、`maxConcurrent: 2`、雜訊 20–24fps。實際負載主要取決於像素數、DPR、同時圖片數及雜訊 FPS。

### 漸進式降級

- 可用 `ImageDecoder`：直接解碼動畫影格
- 可用 Canvas：靜態馬賽克及保持動畫播放的合成
- 無 Canvas：CSS 過渡降級
- `prefers-reduced-motion: reduce`：略過效果並立即顯示原圖

## 無障礙及效能

- 保留原始 `<img>` 及 `alt` 文字
- Canvas 覆蓋層對輔助技術隱藏且不攔截指標事件
- 建議設定圖片 `width` 及 `height` 以減少版面移動
- `quality: 'auto'` 會參考 Save-Data、裝置記憶體、CPU 執行緒及指標類型
- 跨來源動畫直接解碼需要 CORS，但保持播放的降級模式無需 CORS

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
| `duration` | `1250` | 像素過渡時間（毫秒） |
| `startDelay` | `100` | 保持第一個馬賽克狀態的時間 |
| `steps` | `'auto'` | 自動階段或像素尺寸陣列 |
| `stepCount` | `8` | 自動產生的階段數 |
| `fadePortion` | `0` | Canvas 淡出比例；0 直接切換原圖 |
| `maxConcurrent` | `3` | 同時處理的圖片數 |
| `quality` | `'auto'` | `auto`、`low`、`balanced`、`high` |
| `animatedMode` | `'auto'` | `auto`、`decode`、`preserve` |
| `respectReducedMotion` | `true` | 遵循減少動態效果設定 |

## 示範支援語言

公開示範支援韓文、英文、日文、台灣繁體中文、泰文、簡體中文、繁體中文、俄文及意大利文。可自動偵測瀏覽器語言、記住選擇，並支援 `?lang=en` 等網址參數。

## 限制

- 複雜 transform、遮罩或多層 `clip-path` 可能無法與 Canvas 完全對齊
- 跨來源 Animated WebP/APNG 的偵測及直接解碼需要 CORS
- 各瀏覽器動畫能力不同，因此內置保持播放的降級模式

## 授權

問題與錯誤回報：[GitHub Issues](https://github.com/catgarret/Opin/issues) · official@dongri.me
