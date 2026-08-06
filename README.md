# Cultura Alcolica — Bacaro Tour Venezia

Guida a piedi di Venezia a tema bacari: percorso unico su mappa offline, audioguida che parte
all'arrivo su ogni tappa, contatore delle ombre bevute.

PWA solo mobile, interamente statica: nessun backend, nessun account, tutto resta sul telefono.

## Prima di partire

Servono Node 22 o superiore e macOS, perché gli audio segnaposto sono generati con `say`.

Due cartelle di asset **non sono nel repository** e vanno rigenerate dopo un clone: senza, l'app si
apre ma si ferma alla schermata di download con la mappa e gli audio a 404.

```
npm install
```

### Mappa

I tile vettoriali arrivano da Protomaps. Serve il CLI [`pmtiles`](https://github.com/protomaps/go-pmtiles):

```
pmtiles extract https://build.protomaps.com/<data>.pmtiles public/tiles/venezia.pmtiles \
  --bbox=12.28,45.41,12.40,45.47 --maxzoom=15
```

`<data>` è la build giornaliera, per esempio `20260801`. Il file risultante pesa circa 3,7 MB.

Caratteri e icone della mappa stanno invece in `public/mappa/` e sono versionati: servono offline e
non si rigenerano.

### Audio

```
npm run genera-audio
```

Genera un `.m4a` per ogni tappa con `paragrafi`, saltando quelle già fatte. La voce si cambia con
`VOCE=Sandy npm run genera-audio`; cambiarla rigenera tutto, perché l'impronta nel manifest tiene
conto anche della voce.

Lo script scrive anche `src/dati/durate.ts`, che è **generato**: non va modificato a mano, altrimenti
le durate mostrate divergono dai file veri.

> Le voci di macOS sono di Apple e la licenza non ne copre la ridistribuzione. Vanno bene per
> sviluppo e uso personale; prima di pubblicare il sito vanno rifatte con un TTS ridistribuibile
> (Piper, Kokoro) o con il piano gratuito di Azure.

## Sviluppo

```
npm run dev       # server di sviluppo, raggiungibile anche da telefono sulla rete locale
npm run build     # typecheck e build di produzione
npm run preview   # serve dist/, l'unico modo per provare davvero il service worker
npm run test:e2e  # Playwright: geofence, audioguida, persistenza, mappa
```

Il service worker gira anche in sviluppo, ma precache e cache offline si comportano come in
produzione solo con `preview`.

### Provare senza essere a Venezia

- `?demo` nell'URL fa avanzare una posizione finta lungo il percorso, un punto ogni quattro secondi.
- Chrome DevTools → Sensors permette di piazzare la posizione a mano.
- I test end-to-end usano `context.setGeolocation()` e camminano l'intero percorso.

Il pulsante «Sono qui» resta comunque sempre disponibile: a Venezia il GPS sbaglia di 20-50 m e il
geofence automatico non va mai dato per infallibile.

## Come è fatto

```
public/
  tiles/venezia.pmtiles      mappa vettoriale offline (da rigenerare)
  audio/tappa-{id}.m4a       audioguida (da rigenerare)
  mappa/font, mappa/sprite   caratteri e icone della mappa, versionati
src/
  dati/       tappe, percorso, durate audio generate
  hooks/      posizione, geofence, audioguida, wake lock
  offline/    nomi delle cache condivisi con il service worker
  stato/      stato del tour e persistenza su localStorage
  sw.ts       service worker (Workbox, injectManifest)
scripts/
  genera-audio.ts
```

Tile e audio non finiscono nel precache: sono scaricati dalla schermata iniziale tramite messaggi al
service worker e serviti con `CacheFirst` più `RangeRequestsPlugin`, che è indispensabile perché sia
i `.pmtiles` sia i media su Safari viaggiano con richieste HTTP Range.

«Termina tour» cancella lo stato salvato e le due cache dei contenuti, ma non il precache dell'app:
altrimenti dopo la fine del giro l'app non si aprirebbe più offline.

## Licenze

- Mappa: © OpenStreetMap contributors, tile Protomaps.
- Caratteri Noto Sans: SIL Open Font License (`public/mappa/font/OFL.txt`).
- Sprite: MIT, derivato da tangrams/icons (`public/mappa/sprite/LICENSE.md`).
- Audio: generati con le voci di macOS, non ridistribuibili — vedi sopra.
