import { useEffect, useMemo, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import {
  addProtocol,
  Map as MappaLibre,
  Marker,
  setWorkerUrl,
  type ErrorEvent,
  type GeoJSONSource,
} from 'maplibre-gl'
import { Protocol } from 'pmtiles'
import 'maplibre-gl/dist/maplibre-gl.css'
import urlWorkerMappa from 'maplibre-gl/dist/maplibre-gl-worker.mjs?worker&url'
import { creaStile, VENEZIA } from '../mappa/stile'
import { PERCORSO, TAPPE } from '../dati/tappe'
import { MarkerTappa } from './base/MarkerTappa'
import { IndicatorePosizione } from './base/IndicatorePosizione'

type Proprieta = {
  indiceAttiva: number
  completate: number[]
  posizione: [number, number] | null
  accuratezza: number | null
  imprecisa: boolean
  richiestaCentratura: number
  onApriTappa: (id: number) => void
}

let protocolloRegistrato = false

const registraProtocollo = () => {
  if (protocolloRegistrato) return
  setWorkerUrl(urlWorkerMappa)
  const protocollo = new Protocol({ metadata: true })
  addProtocol('pmtiles', protocollo.tile)
  protocolloRegistrato = true
}

const indicePercorso = (coordinate: [number, number]) =>
  PERCORSO.findIndex(([lng, lat]) => lng === coordinate[0] && lat === coordinate[1])

const metriPerPixel = (latitudine: number, zoom: number) =>
  (156543.03392 * Math.cos((latitudine * Math.PI) / 180)) / 2 ** zoom

export function Mappa({
  indiceAttiva,
  completate,
  posizione,
  accuratezza,
  imprecisa,
  richiestaCentratura,
  onApriTappa,
}: Proprieta) {
  const contenitore = useRef<HTMLDivElement>(null)
  const mappa = useRef<MappaLibre | null>(null)
  const markerPosizione = useRef<Marker | null>(null)
  const [errore, setErrore] = useState<string | null>(null)
  const [pronta, setPronta] = useState(false)
  const [zoom, setZoom] = useState(VENEZIA.zoom)

  const elementiTappe = useMemo(
    () => TAPPE.map(() => document.createElement('div')),
    [],
  )
  const elementoPosizione = useMemo(() => document.createElement('div'), [])

  useEffect(() => {
    if (!contenitore.current || mappa.current) return
    registraProtocollo()

    const istanza = new MappaLibre({
      container: contenitore.current,
      style: creaStile(),
      center: TAPPE[0].coordinate,
      zoom: VENEZIA.zoom,
      minZoom: VENEZIA.zoomMinimo,
      maxZoom: VENEZIA.zoomMassimo,
      maxBounds: VENEZIA.limiti,
      attributionControl: { compact: true },
      dragRotate: false,
      pitchWithRotate: false,
    })

    istanza.touchZoomRotate.disableRotation()
    istanza.on('error', (evento: ErrorEvent) => setErrore(evento.error?.message ?? 'Errore mappa'))
    istanza.on('zoom', () => setZoom(istanza.getZoom()))

    istanza.on('load', () => {
      istanza.addSource('percorso', {
        type: 'geojson',
        data: { type: 'FeatureCollection', features: [] },
      })
      istanza.addLayer({
        id: 'percorso-alone',
        type: 'line',
        source: 'percorso',
        layout: { 'line-cap': 'round', 'line-join': 'round' },
        paint: { 'line-color': '#ffffff', 'line-width': 12 },
      })
      istanza.addLayer({
        id: 'percorso-fatto',
        type: 'line',
        source: 'percorso',
        filter: ['==', ['get', 'parte'], 'fatto'],
        layout: { 'line-cap': 'round', 'line-join': 'round' },
        paint: { 'line-color': '#7b1f2b', 'line-width': 6 },
      })
      istanza.addLayer({
        id: 'percorso-da-fare',
        type: 'line',
        source: 'percorso',
        filter: ['==', ['get', 'parte'], 'da-fare'],
        layout: { 'line-cap': 'round', 'line-join': 'round' },
        paint: {
          'line-color': '#7b1f2b',
          'line-width': 6,
          'line-opacity': 0.55,
          'line-dasharray': [0.5, 2],
        },
      })

      TAPPE.forEach((tappa, indice) => {
        new Marker({ element: elementiTappe[indice] }).setLngLat(tappa.coordinate).addTo(istanza)
      })
      markerPosizione.current = new Marker({ element: elementoPosizione })

      setPronta(true)
    })

    mappa.current = istanza

    return () => {
      istanza.remove()
      mappa.current = null
      markerPosizione.current = null
      setPronta(false)
    }
  }, [elementiTappe, elementoPosizione])

  useEffect(() => {
    const istanza = mappa.current
    if (!istanza || !pronta) return
    const sorgente = istanza.getSource<GeoJSONSource>('percorso')
    if (!sorgente) return

    const taglio = Math.max(indicePercorso(TAPPE[indiceAttiva].coordinate), 0)
    sorgente.setData({
      type: 'FeatureCollection',
      features: [
        {
          type: 'Feature',
          properties: { parte: 'fatto' },
          geometry: { type: 'LineString', coordinates: PERCORSO.slice(0, taglio + 1) },
        },
        {
          type: 'Feature',
          properties: { parte: 'da-fare' },
          geometry: { type: 'LineString', coordinates: PERCORSO.slice(taglio) },
        },
      ],
    })
  }, [indiceAttiva, pronta])

  useEffect(() => {
    const istanza = mappa.current
    const marker = markerPosizione.current
    if (!istanza || !marker) return
    if (!posizione) {
      marker.remove()
      return
    }
    marker.setLngLat(posizione).addTo(istanza)
  }, [posizione, pronta])

  useEffect(() => {
    const istanza = mappa.current
    if (!istanza || !pronta) return
    istanza.easeTo({
      center: posizione ?? TAPPE[indiceAttiva].coordinate,
      zoom: Math.max(istanza.getZoom(), VENEZIA.zoom),
      duration: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 0 : 600,
    })
  }, [richiestaCentratura, pronta])

  const raggioPixel =
    posizione && accuratezza
      ? Math.min(accuratezza / metriPerPixel(posizione[1], zoom), 120)
      : 18

  return (
    <div className="mappa">
      <div ref={contenitore} className="mappa-tela" />
      {errore && <p className="mappa-errore">{errore}</p>}
      {elementiTappe.map((elemento, indice) =>
        createPortal(
          <MarkerTappa
            numero={TAPPE[indice].id}
            stato={
              completate.includes(TAPPE[indice].id)
                ? 'fatta'
                : indice === indiceAttiva
                  ? 'attiva'
                  : 'da-fare'
            }
            onApri={() => onApriTappa(TAPPE[indice].id)}
          />,
          elemento,
          TAPPE[indice].id.toString(),
        ),
      )}
      {posizione &&
        createPortal(
          <IndicatorePosizione raggioPixel={raggioPixel} imprecisa={imprecisa} direzione={0} />,
          elementoPosizione,
          'posizione',
        )}
    </div>
  )
}
