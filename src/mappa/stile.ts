import { layers, namedFlavor } from '@protomaps/basemaps'
import type { MapOptions } from 'maplibre-gl'

type Stile = NonNullable<Exclude<MapOptions['style'], string>>

export const URL_MAPPA = '/tiles/venezia.pmtiles'

const URL_FONT = `${import.meta.env.BASE_URL}mappa/font/{fontstack}/{range}.pbf`
const URL_SPRITE = `${import.meta.env.BASE_URL}mappa/sprite/light`

export const VENEZIA = {
  centro: [12.3358, 45.4372] as [number, number],
  zoom: 14.5,
  zoomMinimo: 12,
  zoomMassimo: 19,
  limiti: [12.28, 45.41, 12.4, 45.47] as [number, number, number, number],
}

const SORGENTE = 'protomaps'

export const creaStile = (): Stile => ({
  version: 8,
  glyphs: URL_FONT,
  sprite: URL_SPRITE,
  sources: {
    [SORGENTE]: {
      type: 'vector',
      url: `pmtiles://${URL_MAPPA}`,
      attribution: '© <a href="https://openstreetmap.org">OpenStreetMap</a>, Protomaps',
    },
  },
  layers: layers(SORGENTE, namedFlavor('light'), { lang: 'it' }),
})
