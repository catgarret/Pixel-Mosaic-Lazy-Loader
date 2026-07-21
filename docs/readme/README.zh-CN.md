# Pixel Mosaic Lazy Loader

[![npm version](https://img.shields.io/npm/v/@dong-gri/pixel-mosaic-lazy-loader.svg)](https://www.npmjs.com/package/@dong-gri/pixel-mosaic-lazy-loader)
[![npm downloads](https://img.shields.io/npm/dm/@dong-gri/pixel-mosaic-lazy-loader.svg)](https://www.npmjs.com/package/@dong-gri/pixel-mosaic-lazy-loader)
[![license](https://img.shields.io/npm/l/@dong-gri/pixel-mosaic-lazy-loader.svg)](../../LICENSE)
![dependencies](https://img.shields.io/badge/dependencies-0-2ea44f)

[English (default)](../../README.md) · [한국어](./README.ko.md) · [日本語](./README.ja.md) · [繁體中文（台灣）](./README.zh-TW.md) · [ไทย](./README.th.md) · **简体中文** · [繁體中文](./README.zh-Hant.md) · [Русский](./README.ru.md) · [Italiano](./README.it.md)

无需单独制作低分辨率占位图，即可让图片按 **大像素 → 小像素 → 原图** 显示，并保持 GIF、Animated WebP 与 APNG 持续播放。

![Pixel Mosaic Lazy Loader preview](./example.gif)

[**Live Demo**](https://git.dongri.me/example/pixel-mosaic-live/) · [**npm**](https://www.npmjs.com/package/@dong-gri/pixel-mosaic-lazy-loader) · [**Blog Post**](https://lab.dongri.me/p/pixel-mosaic-lazy-loader)

当前版本: **v1.3.4**

## 为什么使用 Pixel Mosaic Lazy Loader？

- 零依赖，无需额外低分辨率图片
- 支持静态图片、GIF、Animated WebP 和 APNG
- 自动检测动态新增的图片
- 为无障碍与低性能环境提供分级降级

## 快速开始

### npm

可用于 Vite、webpack、Parcel 等支持 ESM 的构建环境。

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

发布到公开 npm 后，相同文件会自动通过 jsDelivr 提供。

以下 CDN 地址省略版本号，会自动使用 npm 当前的 `latest` 版本。

> [!WARNING]
> 发布新的 npm 版本后，未指定版本号的 CDN 地址也会自动更新。

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

#### Minified CDN 文件

生产环境若不需要可读源码，可使用以下体积更小的压缩文件。

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

unpkg 会自动镜像所有公开 npm 包，新版本可能需要几分钟才会出现。

```html
<link rel="stylesheet" href="https://unpkg.com/@dong-gri/pixel-mosaic-lazy-loader/dist/pixel-mosaic.css">
<script src="https://unpkg.com/@dong-gri/pixel-mosaic-lazy-loader/dist/pixel-mosaic.js"></script>
```

## 主要功能

- 自动检测图片，包括页面加载后新增的图片
- 支持简单的阶段数设置和自定义像素尺寸数组
- 可设置过渡时间和开始延迟
- 类似 Photoshop 噪点的实时动态颗粒
- 保持 GIF、Animated WebP 和 APNG 播放
- 渐进增强与多级降级
- 针对移动端和低性能设备的性能控制
- 支持 `prefers-reduced-motion` 等无障碍设置
- 支持 `border-radius`、透明度、`object-fit`、`object-position`

## 基本用法

给图片添加 `data-pixel-mosaic`，然后初始化库。

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

## 像素阶段

简单设置可使用 `steps: 'auto'` 和 `stepCount`；需要精细控制时可直接指定像素尺寸数组。

```js
PixelMosaic.init({
  duration: 1600,
  steps: [64, 40, 24, 14, 8, 4, 2]
});
```

## 单图设置

使用 HTML data 属性可以只覆盖某一张图片的全局选项。

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

## 动画图片

如果浏览器支持 `ImageDecoder` 和对应编码，会直接解码每一帧并像素化；否则会继续播放原始动画并叠加 Canvas 马赛克。Canvas 不可用时仍通过 CSS 降级显示原图。

## 浏览器与设备建议

### 最低支持浏览器

Chrome/Edge 80+、Firefox 74+、Safari 13.1+、iOS Safari 13.4+、Samsung Internet 13+、Android WebView 80+。不支持 Internet Explorer。

### 推荐环境

建议在 HTTPS 下使用 Chrome、Edge、Firefox、Safari 最新两个主要版本。逐帧动画马赛克取决于 `ImageDecoder`、编码、CORS 和浏览器实现。

### 性能建议

保守的最低设置为 2 核 CPU、2 GB 内存、1280×720 以下图片、`maxConcurrent: 1`、噪点不高于 12fps。流畅使用建议 4 核 CPU、4 GB 内存、1920×1080 以下、`maxConcurrent: 2`、噪点 20–24fps。实际负载主要取决于像素数、DPR、并发图片数和噪点 FPS。

### 渐进降级

- 支持 `ImageDecoder`：直接解码动画帧
- 支持 Canvas：静态马赛克和保持动画播放的合成
- 不支持 Canvas：CSS 过渡降级
- `prefers-reduced-motion: reduce`：跳过效果并立即显示原图

## 无障碍与性能

- 保留原始 `<img>` 和 `alt` 文本
- Canvas 覆盖层对辅助技术隐藏且不拦截指针事件
- 建议设置图片 `width` 和 `height` 以减少布局偏移
- `quality: 'auto'` 会参考 Save-Data、设备内存、CPU 线程和指针类型
- 跨域动画直接解码需要 CORS，但保持播放的降级模式无需 CORS

## API

```js
const mosaic = PixelMosaic.init(options);

mosaic.scan(document.querySelector('.new-content'));
mosaic.play(document.querySelector('#hero-image'));
mosaic.replay(document.querySelector('.gallery'));
mosaic.destroy();
```

## 主要选项

| 选项 | 默认值 | 说明 |
|---|---:|---|
| `duration` | `1250` | 像素过渡时长（毫秒） |
| `startDelay` | `100` | 保持第一个马赛克状态的时间 |
| `steps` | `'auto'` | 自动阶段或像素尺寸数组 |
| `stepCount` | `8` | 自动生成的阶段数 |
| `fadePortion` | `0` | Canvas 交叉淡化比例；0 直接切换原图 |
| `maxConcurrent` | `3` | 同时处理的图片数 |
| `quality` | `'auto'` | `auto`、`low`、`balanced`、`high` |
| `animatedMode` | `'auto'` | `auto`、`decode`、`preserve` |
| `respectReducedMotion` | `true` | 遵循减少动态效果设置 |

## 演示支持语言

公开演示支持韩语、英语、日语、台湾繁体中文、泰语、简体中文、繁体中文、俄语和意大利语。可自动检测浏览器语言、保存选择，并支持 `?lang=en` 等 URL 参数。

## 限制

- 复杂 transform、遮罩或多层 `clip-path` 可能无法与 Canvas 完全对齐
- 跨域 Animated WebP/APNG 的检测和直接解码需要 CORS
- 各浏览器动画能力不同，因此内置保持播放的降级模式

## 许可证

MIT © [dongri.me](https://dongri.me) · 使用 AI 氛围编程（vibe coding）打造。
