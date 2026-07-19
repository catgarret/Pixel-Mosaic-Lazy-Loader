# Pixel Mosaic Lazy Loader

[![npm version](https://img.shields.io/npm/v/@dong-gri/pixel-mosaic-lazy-loader.svg)](https://www.npmjs.com/package/@dong-gri/pixel-mosaic-lazy-loader)
[![npm downloads](https://img.shields.io/npm/dm/@dong-gri/pixel-mosaic-lazy-loader.svg)](https://www.npmjs.com/package/@dong-gri/pixel-mosaic-lazy-loader)
[![license](https://img.shields.io/npm/l/@dong-gri/pixel-mosaic-lazy-loader.svg)](../../LICENSE)
![dependencies](https://img.shields.io/badge/dependencies-0-2ea44f)

[English (default)](../../README.md) · **한국어** · [日本語](./README.ja.md) · [繁體中文（台灣）](./README.zh-TW.md) · [ไทย](./README.th.md) · [简体中文](./README.zh-CN.md) · [繁體中文](./README.zh-Hant.md) · [Русский](./README.ru.md) · [Italiano](./README.it.md)

별도의 저해상도 플레이스홀더 없이 이미지를 **큰 픽셀 → 작은 픽셀 → 원본 이미지**로 전환합니다. GIF·Animated WebP·APNG의 재생도 멈추지 않습니다.

![Pixel Mosaic Lazy Loader preview](./example.gif)

[**Live Demo**](https://git.dongri.me/example/pixel-mosaic-live/) · [**npm**](https://www.npmjs.com/package/@dong-gri/pixel-mosaic-lazy-loader) · [**Blog Post**](https://lab.dongri.me/p/pixel-mosaic-lazy-loader)

현재 릴리스: **v1.3.4**

## 왜 Pixel Mosaic Lazy Loader인가?

- 의존성 0개, 별도 저해상도 이미지 불필요
- 정적 이미지와 GIF·Animated WebP·APNG 지원
- 동적 삽입 이미지 자동 감지
- 접근성·저사양 환경을 위한 단계적 폴백

## 빠른 시작

### npm

Vite, webpack, Parcel 등 ESM을 지원하는 빌드 환경에서 사용합니다.

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

npm에 공개 배포하면 같은 파일이 jsDelivr에 자동으로 제공됩니다. 

아래 CDN 주소는 버전을 생략해 npm의 최신 `latest` 릴리스를 자동으로 사용합니다.

> [!WARNING]
> 새 버전을 npm에 배포하면 기존의 버전 미지정 CDN 주소도 자동으로 갱신됩니다.

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

#### Minified CDN 파일

소스 가독성이 필요하지 않은 운영 환경에서는 용량을 줄인 아래 파일을 사용할 수 있습니다.

**jsDelivr**

- JavaScript: `https://cdn.jsdelivr.net/npm/@dong-gri/pixel-mosaic-lazy-loader/dist/pixel-mosaic.min.js`
- ES Module: `https://cdn.jsdelivr.net/npm/@dong-gri/pixel-mosaic-lazy-loader/dist/pixel-mosaic.min.mjs`
- CSS: `https://cdn.jsdelivr.net/npm/@dong-gri/pixel-mosaic-lazy-loader/dist/pixel-mosaic.min.css`

**unpkg**

- JavaScript: `https://unpkg.com/@dong-gri/pixel-mosaic-lazy-loader/dist/pixel-mosaic.min.js`
- ES Module: `https://unpkg.com/@dong-gri/pixel-mosaic-lazy-loader/dist/pixel-mosaic.min.mjs`
- CSS: `https://unpkg.com/@dong-gri/pixel-mosaic-lazy-loader/dist/pixel-mosaic.min.css`

### CDN ESM 방식

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

unpkg는 공개 npm 패키지를 자동으로 미러링합니다. 새 버전이 보이기까지 몇 분 걸릴 수 있습니다.

```html
<link rel="stylesheet" href="https://unpkg.com/@dong-gri/pixel-mosaic-lazy-loader/dist/pixel-mosaic.css">
<script src="https://unpkg.com/@dong-gri/pixel-mosaic-lazy-loader/dist/pixel-mosaic.js"></script>
```

## 주요 기능

- 페이지 로드 후 추가된 이미지를 포함한 자동 이미지 감지
- 단계 수 프리셋과 픽셀 크기 직접 지정 동시 지원
- 전환 시간과 시작 지연 설정
- 포토샵 노이즈처럼 계속 움직이는 실시간 노이즈
- GIF·Animated WebP·APNG 재생 유지
- 점진적 기능 향상과 단계적 폴백
- 모바일·저사양 기기를 위한 성능 제어
- `prefers-reduced-motion`을 포함한 접근성 지원
- `border-radius`, 투명도, `object-fit`, `object-position` 대응

## 기본 사용법

이미지에 `data-pixel-mosaic`를 추가하고 라이브러리를 초기화합니다.

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

## 픽셀 단계 설정

간단하게 설정하려면 `steps: 'auto'`와 `stepCount`를 사용하고, 세밀한 제어가 필요하면 픽셀 크기 배열을 직접 지정합니다.

```js
PixelMosaic.init({
  duration: 1600,
  steps: [64, 40, 24, 14, 8, 4, 2]
});
```

## 이미지별 설정

HTML 데이터 속성을 사용하면 특정 이미지에서만 전역 옵션을 덮어쓸 수 있습니다.

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

## 움직이는 이미지

`ImageDecoder`와 코덱을 사용할 수 있으면 각 프레임을 직접 디코딩해 픽셀화합니다. 사용할 수 없으면 원본 애니메이션을 계속 재생하면서 Canvas 모자이크를 합성합니다. Canvas도 사용할 수 없는 환경에서는 CSS 폴백을 통해 원본 이미지를 유지합니다.

## 브라우저와 기기 권장 환경

### 최소 지원 브라우저

Chrome·Edge 80+, Firefox 74+, Safari 13.1+, iOS Safari 13.4+, Samsung Internet 13+, Android WebView 80+. Internet Explorer는 지원하지 않습니다.

### 권장 환경

HTTPS에서 Chrome, Edge, Firefox, Safari의 최신 2개 주요 버전을 권장합니다. 프레임 단위 애니메이션 모자이크는 `ImageDecoder`, 코덱, CORS와 브라우저 구현 상태에 따라 활성화됩니다.

### 성능 권장값

보수적인 최소 설정은 2코어 CPU, 메모리 2GB, 1280×720 이하 이미지, `maxConcurrent: 1`, 노이즈 12fps 이하입니다. 원활한 사용에는 4코어 CPU, 메모리 4GB, 1920×1080 이하 이미지, `maxConcurrent: 2`, 노이즈 20~24fps를 권장합니다. 실제 부하는 픽셀 수, DPR, 동시 이미지 수, 노이즈 FPS에 좌우됩니다.

### 단계적 기능 축소

- `ImageDecoder` 사용 가능: 애니메이션 프레임을 직접 디코딩해 모자이크 처리
- Canvas 사용 가능: 정적 모자이크 및 애니메이션 재생 유지 합성
- Canvas 미지원: CSS 전환 폴백
- `prefers-reduced-motion: reduce`: 효과를 생략하고 원본 즉시 표시

## 접근성과 성능

- 원본 `<img>`와 `alt` 텍스트를 문서에 유지합니다
- Canvas 오버레이는 보조 기술에서 숨기고 포인터 이벤트를 가로채지 않습니다
- 이미지에 `width`와 `height`를 지정해 레이아웃 이동을 줄이세요
- `quality: 'auto'`는 Save-Data, 기기 메모리, CPU 스레드, 포인터 유형을 참고합니다
- 교차 출처 애니메이션의 직접 디코딩에는 CORS가 필요하지만, 재생 유지 폴백은 CORS 없이도 동작합니다

## API

```js
const mosaic = PixelMosaic.init(options);

mosaic.scan(document.querySelector('.new-content'));
mosaic.play(document.querySelector('#hero-image'));
mosaic.replay(document.querySelector('.gallery'));
mosaic.destroy();
```

## 주요 옵션

| 옵션 | 기본값 | 설명 |
|---|---:|---|
| `duration` | `1250` | 픽셀 전환 시간(ms) |
| `startDelay` | `100` | 첫 모자이크 상태를 유지하는 시간(ms) |
| `steps` | `'auto'` | 자동 단계 또는 픽셀 크기 배열 |
| `stepCount` | `8` | 자동 생성할 단계 수 |
| `fadePortion` | `0` | Canvas 교차 페이드 비율. 0이면 원본으로 즉시 전환 |
| `maxConcurrent` | `3` | 동시에 처리할 이미지 수 |
| `quality` | `'auto'` | `auto`, `low`, `balanced`, `high` |
| `animatedMode` | `'auto'` | `auto`, `decode`, `preserve` |
| `respectReducedMotion` | `true` | 동작 줄이기 설정 반영 |

## 데모 지원 언어

공개 데모는 한국어, 영어, 일본어, 대만식 번체 중국어, 태국어, 중국어 간체, 중국어 번체, 러시아어, 이탈리아어를 지원합니다. 브라우저 언어를 감지하고 선택값을 저장하며 `?lang=en`, `?lang=ja` 같은 URL 파라미터를 지원합니다.

## 제약

- 복잡한 transform, 마스크, 다중 `clip-path` 조합은 Canvas 오버레이와 완전히 일치하지 않을 수 있습니다
- 교차 출처 Animated WebP·APNG 판별과 직접 디코딩에는 CORS가 필요합니다
- 애니메이션 지원 범위가 브라우저마다 달라 재생 유지 폴백을 포함합니다

## 라이선스

MIT License.
