# Pixel Mosaic Lazy Loader

[English](../../README.md) · [한국어](./README.ko.md) · [日本語](./README.ja.md) · [繁體中文（台灣）](./README.zh-TW.md) · [ไทย](./README.th.md) · [简体中文](./README.zh-CN.md) · [繁體中文](./README.zh-Hant.md) · [Русский](./README.ru.md) · **Italiano**

[**Live Demo**](https://git.dongri.me/example/pixel-mosaic-live/) · [**Blog Post**](https://lab.dongri.me/p/pixel-mosaic-lazy-loader)

Versione corrente: **v1.3.4**

Un image loader JavaScript senza dipendenze che rileva gli elementi `<img>` e li rivela con la sequenza **pixel grandi → pixel piccoli → immagine originale**. Supporta immagini statiche, GIF, Animated WebP e APNG mantenendo la riproduzione delle animazioni.

## Funzionalità

- Rilevamento automatico, incluse le immagini aggiunte dopo il caricamento
- Numero di passaggi semplice o array personalizzato di dimensioni pixel
- Durata e ritardo iniziale configurabili
- Rumore animato in tempo reale simile a Photoshop
- Riproduzione continua di GIF, Animated WebP e APNG
- Progressive enhancement e fallback graduale
- Controlli prestazionali per mobile e dispositivi poco potenti
- Accessibilità, incluso `prefers-reduced-motion`
- Supporto per `border-radius`, trasparenza, `object-fit` e `object-position`

## Installazione

### npm

Usalo con Vite, webpack, Parcel o un altro ambiente di build compatibile con ESM.

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

Dopo la pubblicazione pubblica su npm, gli stessi file diventano automaticamente disponibili tramite jsDelivr. In produzione fissa sempre la versione.

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

#### File CDN minificati

In produzione puoi usare i file ridotti qui sotto quando non serve un sorgente leggibile.

**jsDelivr**

- JavaScript: `https://cdn.jsdelivr.net/npm/@dong-gri/pixel-mosaic-lazy-loader@1.3.4/dist/pixel-mosaic.min.js`
- ES Module: `https://cdn.jsdelivr.net/npm/@dong-gri/pixel-mosaic-lazy-loader@1.3.4/dist/pixel-mosaic.min.mjs`
- CSS: `https://cdn.jsdelivr.net/npm/@dong-gri/pixel-mosaic-lazy-loader@1.3.4/dist/pixel-mosaic.min.css`

**unpkg**

- JavaScript: `https://unpkg.com/@dong-gri/pixel-mosaic-lazy-loader@1.3.4/dist/pixel-mosaic.min.js`
- ES Module: `https://unpkg.com/@dong-gri/pixel-mosaic-lazy-loader@1.3.4/dist/pixel-mosaic.min.mjs`
- CSS: `https://unpkg.com/@dong-gri/pixel-mosaic-lazy-loader@1.3.4/dist/pixel-mosaic.min.css`

### ES Module via CDN

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

unpkg replica automaticamente tutti i pacchetti npm pubblici. Una nuova versione può richiedere alcuni minuti per apparire.

```html
<link rel="stylesheet" href="https://unpkg.com/@dong-gri/pixel-mosaic-lazy-loader@1.3.4/dist/pixel-mosaic.css">
<script src="https://unpkg.com/@dong-gri/pixel-mosaic-lazy-loader@1.3.4/dist/pixel-mosaic.js"></script>
```

## Utilizzo di base

Aggiungi `data-pixel-mosaic` all’immagine e inizializza la libreria.

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

## Passaggi pixel

Usa `steps: 'auto'` con `stepCount` per una configurazione semplice, oppure fornisci un array di dimensioni pixel per un controllo avanzato.

```js
PixelMosaic.init({
  duration: 1600,
  steps: [64, 40, 24, 14, 8, 4, 2]
});
```

## Impostazioni per immagine

Gli attributi data HTML sovrascrivono le opzioni globali per una singola immagine.

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

## Immagini animate

Quando `ImageDecoder` e il codec sono disponibili, i frame vengono decodificati e pixelati direttamente. In caso contrario, l’animazione originale continua mentre un mosaico Canvas viene sovrapposto. Se Canvas non è disponibile, il fallback CSS mantiene visibile l’immagine originale.

## Browser e dispositivi

### Supporto minimo browser

Chrome/Edge 80+, Firefox 74+, Safari 13.1+, iOS Safari 13.4+, Samsung Internet 13+, Android WebView 80+. Internet Explorer non è supportato.

### Ambiente consigliato

Usa le ultime due versioni principali di Chrome, Edge, Firefox o Safari su HTTPS. Il mosaico animato frame per frame dipende da `ImageDecoder`, codec, CORS e implementazione del browser.

### Indicazioni prestazionali

Configurazione minima prudente: CPU 2 core, 2 GB RAM, immagini fino a 1280×720, `maxConcurrent: 1`, rumore fino a 12fps. Per maggiore fluidità: CPU 4 core, 4 GB RAM, immagini fino a 1920×1080, `maxConcurrent: 2`, rumore 20–24fps. Il carico reale dipende da numero di pixel, DPR, immagini simultanee e FPS del rumore.

### Fallback progressivo

- `ImageDecoder` disponibile: decodifica diretta dei frame
- Canvas disponibile: mosaico statico e compositing che preserva l’animazione
- Canvas non disponibile: transizione CSS
- `prefers-reduced-motion: reduce`: salta l’effetto e mostra subito l’originale

## Accessibilità e prestazioni

- L’elemento `<img>` originale e il testo `alt` restano nel documento
- Gli overlay Canvas sono nascosti alle tecnologie assistive e non intercettano gli eventi del puntatore
- Imposta `width` e `height` per ridurre i layout shift
- `quality: 'auto'` considera Save-Data, memoria del dispositivo, thread CPU e tipo di puntatore
- La decodifica diretta cross-origin richiede CORS, ma il fallback che preserva la riproduzione funziona senza CORS

## API

```js
const mosaic = PixelMosaic.init(options);

mosaic.scan(document.querySelector('.new-content'));
mosaic.play(document.querySelector('#hero-image'));
mosaic.replay(document.querySelector('.gallery'));
mosaic.destroy();
```

## Opzioni principali

| Opzione | Predefinito | Descrizione |
|---|---:|---|
| `duration` | `1250` | Durata della transizione in millisecondi |
| `startDelay` | `100` | Tempo di mantenimento del primo stato mosaico |
| `steps` | `'auto'` | Passaggi automatici o array di dimensioni pixel |
| `stepCount` | `8` | Numero di passaggi generati automaticamente |
| `fadePortion` | `0` | Rapporto crossfade Canvas; zero passa subito all’originale |
| `maxConcurrent` | `3` | Numero massimo di immagini elaborate insieme |
| `quality` | `'auto'` | `auto`, `low`, `balanced`, `high` |
| `animatedMode` | `'auto'` | `auto`, `decode`, `preserve` |
| `respectReducedMotion` | `true` | Rispetta le preferenze di movimento ridotto |

## Lingue della demo

La demo pubblica supporta coreano, inglese, giapponese, cinese tradizionale per Taiwan, thailandese, cinese semplificato, cinese tradizionale, russo e italiano. Rileva la lingua del browser, ricorda la selezione e accetta parametri URL come `?lang=en`.

## Limitazioni

- Transform, maschere o combinazioni `clip-path` complesse potrebbero non allinearsi perfettamente al Canvas
- Il rilevamento e la decodifica diretta di Animated WebP/APNG cross-origin richiedono CORS
- Le capacità di animazione variano tra browser, quindi è sempre incluso un fallback che preserva la riproduzione

## Licenza

MIT License.
