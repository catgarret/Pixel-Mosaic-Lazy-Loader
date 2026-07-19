# Pixel Mosaic Lazy Loader

[English](../../README.md) · [한국어](./README.ko.md) · [日本語](./README.ja.md) · [繁體中文（台灣）](./README.zh-TW.md) · **ไทย** · [简体中文](./README.zh-CN.md) · [繁體中文](./README.zh-Hant.md) · [Русский](./README.ru.md) · [Italiano](./README.it.md)

[**Live Demo**](https://git.dongri.me/example/pixel-mosaic-live/) · [**Blog Post**](https://lab.dongri.me/p/pixel-mosaic-lazy-loader)

เวอร์ชันปัจจุบัน: **v1.3.4**

ตัวโหลดรูปภาพ JavaScript แบบไม่ต้องพึ่งไลบรารีอื่น ซึ่งตรวจจับ `<img>` และแสดงผลจาก **พิกเซลใหญ่ → พิกเซลเล็ก → รูปต้นฉบับ** รองรับภาพนิ่ง GIF, Animated WebP และ APNG โดยไม่หยุดการเล่นแอนิเมชัน

## คุณสมบัติหลัก

- ตรวจจับรูปภาพอัตโนมัติ รวมถึงรูปที่เพิ่มภายหลัง
- ตั้งค่าจำนวนขั้นแบบง่ายหรือระบุขนาดพิกเซลเอง
- กำหนดระยะเวลาและเวลาหน่วงก่อนเริ่ม
- นอยส์แบบเคลื่อนไหวเรียลไทม์คล้าย Photoshop
- คงการเล่น GIF, Animated WebP และ APNG
- Progressive enhancement และ fallback หลายระดับ
- ควบคุมประสิทธิภาพสำหรับมือถือและอุปกรณ์สเปกต่ำ
- รองรับการเข้าถึง รวมถึง `prefers-reduced-motion`
- รองรับ `border-radius`, ความโปร่งใส, `object-fit`, `object-position`

## การติดตั้ง

### npm

ใช้กับ Vite, webpack, Parcel หรือเครื่องมือ build ที่รองรับ ESM

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

เมื่อเผยแพร่แพ็กเกจสาธารณะบน npm ไฟล์เดียวกันจะพร้อมใช้ผ่าน jsDelivr โดยอัตโนมัติ ควรล็อกเวอร์ชันในระบบจริง

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@dong-gri/pixel-mosaic-lazy-loader@1.3.4/dist/pixel-mosaic.css">
<script src="https://cdn.jsdelivr.net/npm/@dong-gri/pixel-mosaic-lazy-loader@1.3.4/dist/pixel-mosaic.js"></script>
<script>
  PixelMosaic.init({
    duration: 1600,
    startDelay: 100,
    steps: 'auto',
    stepCount: 8
  });
</script>
```

#### ไฟล์ CDN แบบ Minified

สำหรับงานจริงที่ไม่ต้องอ่านซอร์สโค้ด สามารถใช้ไฟล์ขนาดเล็กด้านล่างได้

**jsDelivr**

- JavaScript: `https://cdn.jsdelivr.net/npm/@dong-gri/pixel-mosaic-lazy-loader@1.3.4/dist/pixel-mosaic.min.js`
- ES Module: `https://cdn.jsdelivr.net/npm/@dong-gri/pixel-mosaic-lazy-loader@1.3.4/dist/pixel-mosaic.min.mjs`
- CSS: `https://cdn.jsdelivr.net/npm/@dong-gri/pixel-mosaic-lazy-loader@1.3.4/dist/pixel-mosaic.min.css`

**unpkg**

- JavaScript: `https://unpkg.com/@dong-gri/pixel-mosaic-lazy-loader@1.3.4/dist/pixel-mosaic.min.js`
- ES Module: `https://unpkg.com/@dong-gri/pixel-mosaic-lazy-loader@1.3.4/dist/pixel-mosaic.min.mjs`
- CSS: `https://unpkg.com/@dong-gri/pixel-mosaic-lazy-loader@1.3.4/dist/pixel-mosaic.min.css`

### ES Module ผ่าน CDN

```html
<script type="module">
  import PixelMosaic from 'https://cdn.jsdelivr.net/npm/@dong-gri/pixel-mosaic-lazy-loader@1.3.4/dist/pixel-mosaic.mjs';

  PixelMosaic.init({
    duration: 1600,
    startDelay: 100,
    steps: 'auto',
    stepCount: 8
  });
</script>
```

### unpkg CDN

unpkg มิเรอร์แพ็กเกจ npm สาธารณะโดยอัตโนมัติ เวอร์ชันใหม่อาจใช้เวลาหลายนาทีจึงจะปรากฏ

```html
<link rel="stylesheet" href="https://unpkg.com/@dong-gri/pixel-mosaic-lazy-loader@1.3.4/dist/pixel-mosaic.css">
<script src="https://unpkg.com/@dong-gri/pixel-mosaic-lazy-loader@1.3.4/dist/pixel-mosaic.js"></script>
```

## วิธีใช้พื้นฐาน

เพิ่ม `data-pixel-mosaic` ให้รูปภาพ แล้วเริ่มต้นไลบรารี

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

## ขั้นของพิกเซล

ใช้ `steps: 'auto'` กับ `stepCount` สำหรับการตั้งค่าง่าย ๆ หรือระบุอาร์เรย์ขนาดพิกเซลเพื่อควบคุมละเอียด

```js
PixelMosaic.init({
  duration: 1600,
  steps: [64, 40, 24, 14, 8, 4, 2]
});
```

## ตั้งค่ารายรูป

data attribute ใน HTML สามารถแทนค่าตัวเลือกส่วนกลางเฉพาะรูปได้

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

## ภาพเคลื่อนไหว

เมื่อมี `ImageDecoder` และ codec ที่รองรับ ระบบจะถอดรหัสแต่ละเฟรมและทำพิกเซลโดยตรง หากใช้ไม่ได้ จะคงการเล่นภาพต้นฉบับและซ้อน Canvas mosaic ด้านบน หากไม่มี Canvas จะใช้ CSS fallback และยังแสดงรูปต้นฉบับ

## เบราว์เซอร์และอุปกรณ์ที่แนะนำ

### เบราว์เซอร์ขั้นต่ำ

Chrome/Edge 80+, Firefox 74+, Safari 13.1+, iOS Safari 13.4+, Samsung Internet 13+, Android WebView 80+ ไม่รองรับ Internet Explorer

### สภาพแวดล้อมที่แนะนำ

แนะนำ Chrome, Edge, Firefox หรือ Safari สองเวอร์ชันหลักล่าสุดบน HTTPS การทำ mosaic แบบต่อเฟรมขึ้นอยู่กับ `ImageDecoder`, codec, CORS และการรองรับของเบราว์เซอร์

### คำแนะนำด้านประสิทธิภาพ

ค่าขั้นต่ำแบบระมัดระวังคือ CPU 2 คอร์, RAM 2 GB, รูปไม่เกิน 1280×720, `maxConcurrent: 1` และนอยส์ไม่เกิน 12fps สำหรับการทำงานที่ลื่นขึ้น แนะนำ CPU 4 คอร์, RAM 4 GB, รูปไม่เกิน 1920×1080, `maxConcurrent: 2` และนอยส์ 20–24fps ภาระจริงขึ้นอยู่กับจำนวนพิกเซล DPR จำนวนรูปพร้อมกัน และ FPS ของนอยส์

### Fallback แบบเป็นลำดับ

- มี `ImageDecoder`: ถอดรหัสเฟรมแอนิเมชันโดยตรง
- มี Canvas: mosaic ภาพนิ่งและซ้อนทับโดยคงการเล่นแอนิเมชัน
- ไม่มี Canvas: ใช้ CSS transition
- `prefers-reduced-motion: reduce`: ข้ามเอฟเฟกต์และแสดงรูปต้นฉบับทันที

## การเข้าถึงและประสิทธิภาพ

- คง `<img>` และข้อความ `alt` เดิมไว้
- ซ่อน Canvas overlay จากเทคโนโลยีช่วยเหลือและไม่บล็อก pointer event
- กำหนด `width` และ `height` เพื่อลด layout shift
- `quality: 'auto'` พิจารณา Save-Data หน่วยความจำ จำนวนเธรด CPU และชนิด pointer
- การถอดรหัสภาพข้ามโดเมนต้องใช้ CORS แต่ fallback ที่คงการเล่นยังทำงานได้โดยไม่ใช้ CORS

## API

```js
const mosaic = PixelMosaic.init(options);

mosaic.scan(document.querySelector('.new-content'));
mosaic.play(document.querySelector('#hero-image'));
mosaic.replay(document.querySelector('.gallery'));
mosaic.destroy();
```

## ตัวเลือกหลัก

| ตัวเลือก | ค่าเริ่มต้น | คำอธิบาย |
|---|---:|---|
| `duration` | `1250` | ระยะเวลาการเปลี่ยนพิกเซล (ms) |
| `startDelay` | `100` | เวลาคงสถานะ mosaic แรก |
| `steps` | `'auto'` | ขั้นอัตโนมัติหรืออาร์เรย์ขนาดพิกเซล |
| `stepCount` | `8` | จำนวนขั้นอัตโนมัติ |
| `fadePortion` | `0` | สัดส่วน crossfade ของ Canvas; 0 เปลี่ยนเป็นรูปต้นฉบับทันที |
| `maxConcurrent` | `3` | จำนวนรูปที่ประมวลผลพร้อมกัน |
| `quality` | `'auto'` | `auto`, `low`, `balanced`, `high` |
| `animatedMode` | `'auto'` | `auto`, `decode`, `preserve` |
| `respectReducedMotion` | `true` | เคารพการตั้งค่าลดการเคลื่อนไหว |

## ภาษาที่รองรับในเดโม

เดโมสาธารณะรองรับภาษาเกาหลี อังกฤษ ญี่ปุ่น จีนตัวเต็มสำหรับไต้หวัน ไทย จีนตัวย่อ จีนตัวเต็ม รัสเซีย และอิตาลี ระบบตรวจจับภาษาของเบราว์เซอร์ จดจำการเลือก และรองรับพารามิเตอร์ URL เช่น `?lang=en`

## ข้อจำกัด

- transform, mask หรือ `clip-path` ที่ซับซ้อนอาจไม่ตรงกับ Canvas overlay อย่างสมบูรณ์
- การตรวจจับและถอดรหัส Animated WebP/APNG ข้ามโดเมนต้องใช้ CORS
- ความสามารถด้านแอนิเมชันต่างกันตามเบราว์เซอร์ จึงมี fallback ที่คงการเล่นเสมอ

## สัญญาอนุญาต

MIT License.
