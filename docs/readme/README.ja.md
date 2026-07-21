# Pixel Mosaic Lazy Loader

[![npm version](https://img.shields.io/npm/v/@dong-gri/pixel-mosaic-lazy-loader.svg)](https://www.npmjs.com/package/@dong-gri/pixel-mosaic-lazy-loader)
[![npm downloads](https://img.shields.io/npm/dm/@dong-gri/pixel-mosaic-lazy-loader.svg)](https://www.npmjs.com/package/@dong-gri/pixel-mosaic-lazy-loader)
[![license](https://img.shields.io/npm/l/@dong-gri/pixel-mosaic-lazy-loader.svg)](../../LICENSE)
![dependencies](https://img.shields.io/badge/dependencies-0-2ea44f)

[English (default)](../../README.md) · [한국어](./README.ko.md) · **日本語** · [繁體中文（台灣）](./README.zh-TW.md) · [ไทย](./README.th.md) · [简体中文](./README.zh-CN.md) · [繁體中文](./README.zh-Hant.md) · [Русский](./README.ru.md) · [Italiano](./README.it.md)

別の低解像度プレースホルダーを用意せず、画像を **大きなピクセル → 小さなピクセル → 元画像**へ切り替えます。GIF・Animated WebP・APNG の再生も維持します。

![Pixel Mosaic Lazy Loader preview](./example.gif)

[**Live Demo**](https://git.dongri.me/example/pixel-mosaic-live/) · [**npm**](https://www.npmjs.com/package/@dong-gri/pixel-mosaic-lazy-loader) · [**Blog Post**](https://lab.dongri.me/p/pixel-mosaic-lazy-loader)

現在のリリース: **v1.3.4**

## Pixel Mosaic Lazy Loader を選ぶ理由

- 依存関係ゼロ、低解像度画像も不要
- 静止画・GIF・Animated WebP・APNG に対応
- 動的に追加された画像も自動検出
- アクセシビリティと低性能環境向けの段階的フォールバック

## クイックスタート

### npm

Vite、webpack、Parcel など ESM 対応環境で利用します。

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

npm に公開すると、同じファイルが jsDelivr から自動的に配信されます。

以下の CDN URL はバージョンを省略し、npm の最新 `latest` リリースを自動的に使用します。

> [!WARNING]
> npm に新しいバージョンを公開すると、バージョン未指定の CDN URL も自動的に更新されます。

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

#### Minified CDN ファイル

可読性が不要な本番環境では、容量を抑えた以下のファイルを使用できます。

**jsDelivr**

- JavaScript: `https://cdn.jsdelivr.net/npm/@dong-gri/pixel-mosaic-lazy-loader/dist/pixel-mosaic.min.js`
- ES Module: `https://cdn.jsdelivr.net/npm/@dong-gri/pixel-mosaic-lazy-loader/dist/pixel-mosaic.min.mjs`
- CSS: `https://cdn.jsdelivr.net/npm/@dong-gri/pixel-mosaic-lazy-loader/dist/pixel-mosaic.min.css`

**unpkg**

- JavaScript: `https://unpkg.com/@dong-gri/pixel-mosaic-lazy-loader/dist/pixel-mosaic.min.js`
- ES Module: `https://unpkg.com/@dong-gri/pixel-mosaic-lazy-loader/dist/pixel-mosaic.min.mjs`
- CSS: `https://unpkg.com/@dong-gri/pixel-mosaic-lazy-loader/dist/pixel-mosaic.min.css`

### CDN の ES Module

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

unpkg は公開 npm パッケージを自動的にミラーします。新しいバージョンの反映に数分かかる場合があります。

```html
<link rel="stylesheet" href="https://unpkg.com/@dong-gri/pixel-mosaic-lazy-loader/dist/pixel-mosaic.css">
<script src="https://unpkg.com/@dong-gri/pixel-mosaic-lazy-loader/dist/pixel-mosaic.js"></script>
```

## 主な機能

- ページ読み込み後に追加された画像も含めた自動検出
- 段階数プリセットとピクセルサイズの直接指定
- 切り替え時間と開始遅延の設定
- Photoshop のノイズのように動き続けるリアルタイムノイズ
- GIF・Animated WebP・APNG の再生維持
- プログレッシブエンハンスメントと段階的フォールバック
- モバイル・低性能端末向けのパフォーマンス制御
- `prefers-reduced-motion` を含むアクセシビリティ対応
- `border-radius`、透過、`object-fit`、`object-position` 対応

## 基本的な使い方

画像に `data-pixel-mosaic` を追加し、ライブラリを初期化します。

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

## ピクセル段階

簡単な設定には `steps: 'auto'` と `stepCount` を使用し、細かく調整する場合はピクセルサイズ配列を指定します。

```js
PixelMosaic.init({
  duration: 1600,
  steps: [64, 40, 24, 14, 8, 4, 2]
});
```

## 画像ごとの設定

HTML の data 属性で、特定の画像だけグローバル設定を上書きできます。

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

## アニメーション画像

`ImageDecoder` と対象コーデックが利用できる場合は、各フレームを直接デコードしてピクセル化します。利用できない場合は元のアニメーションを再生したまま Canvas モザイクを合成します。Canvas が利用できない場合も CSS フォールバックで元画像を表示します。

## ブラウザーと端末の目安

### 最低対応ブラウザー

Chrome/Edge 80+、Firefox 74+、Safari 13.1+、iOS Safari 13.4+、Samsung Internet 13+、Android WebView 80+。Internet Explorer は非対応です。

### 推奨環境

HTTPS 上で Chrome、Edge、Firefox、Safari の最新 2 メジャーバージョンを推奨します。フレーム単位のアニメーションモザイクは `ImageDecoder`、コーデック、CORS、ブラウザー実装に依存します。

### パフォーマンスの目安

保守的な最低設定は 2 コア CPU、2 GB RAM、1280×720 以下、`maxConcurrent: 1`、ノイズ 12fps 以下です。より滑らかな動作には 4 コア CPU、4 GB RAM、1920×1080 以下、`maxConcurrent: 2`、ノイズ 20〜24fps を推奨します。実際の負荷は画素数、DPR、同時画像数、ノイズ FPS に左右されます。

### 段階的フォールバック

- `ImageDecoder` 利用可能：アニメーションフレームを直接デコード
- Canvas 利用可能：静止画モザイクと再生維持型の合成
- Canvas 非対応：CSS トランジション
- `prefers-reduced-motion: reduce`：効果を省略して元画像を即時表示

## アクセシビリティと性能

- 元の `<img>` と `alt` テキストを維持します
- Canvas オーバーレイは支援技術から隠し、ポインター操作を妨げません
- `width` と `height` を指定してレイアウトシフトを減らしてください
- `quality: 'auto'` は Save-Data、メモリ、CPU スレッド、ポインター種類を参照します
- クロスオリジンの直接デコードには CORS が必要ですが、再生維持フォールバックは CORS なしでも動作します

## API

```js
const mosaic = PixelMosaic.init(options);

mosaic.scan(document.querySelector('.new-content'));
mosaic.play(document.querySelector('#hero-image'));
mosaic.replay(document.querySelector('.gallery'));
mosaic.destroy();
```

## 主なオプション

| オプション | 既定値 | 説明 |
|---|---:|---|
| `duration` | `1250` | ピクセル切り替え時間（ms） |
| `startDelay` | `100` | 最初のモザイク状態を維持する時間（ms） |
| `steps` | `'auto'` | 自動段階またはピクセルサイズ配列 |
| `stepCount` | `8` | 自動生成する段階数 |
| `fadePortion` | `0` | Canvas クロスフェード比率。0 は元画像へ即時切り替え |
| `maxConcurrent` | `3` | 同時処理する画像数 |
| `quality` | `'auto'` | `auto`、`low`、`balanced`、`high` |
| `animatedMode` | `'auto'` | `auto`、`decode`、`preserve` |
| `respectReducedMotion` | `true` | 動きを減らす設定を尊重 |

## デモの対応言語

公開デモは韓国語、英語、日本語、台湾向け繁体字中国語、タイ語、簡体字中国語、繁体字中国語、ロシア語、イタリア語に対応します。ブラウザー言語の検出、選択の保存、`?lang=en` などの URL パラメーターを利用できます。

## 制限事項

- 複雑な transform、マスク、複数の `clip-path` は Canvas と完全に一致しない場合があります
- クロスオリジンの Animated WebP/APNG の判定と直接デコードには CORS が必要です
- ブラウザーごとの差を吸収するため再生維持フォールバックを含みます

## ライセンス

MIT © [dongri.me](https://dongri.me) · AI バイブコーディングで作りました。
