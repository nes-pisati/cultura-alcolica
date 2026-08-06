/// <reference lib="webworker" />
import { cleanupOutdatedCaches, precacheAndRoute } from 'workbox-precaching'
import { registerRoute } from 'workbox-routing'
import { CacheFirst } from 'workbox-strategies'
import { RangeRequestsPlugin } from 'workbox-range-requests'
import { CACHE_AUDIO, CACHE_MAPPA } from './offline/cache'

declare const self: ServiceWorkerGlobalScope

cleanupOutdatedCaches()
precacheAndRoute(self.__WB_MANIFEST)

self.addEventListener('activate', (evento) => evento.waitUntil(self.clients.claim()))

const isPmtiles = ({ url }: { url: URL }) => url.pathname.endsWith('.pmtiles')
const isAudio = ({ url }: { url: URL }) => url.pathname.endsWith('.m4a')

registerRoute(
  isPmtiles,
  new CacheFirst({
    cacheName: CACHE_MAPPA,
    plugins: [new RangeRequestsPlugin()],
  }),
)

registerRoute(
  isAudio,
  new CacheFirst({
    cacheName: CACHE_AUDIO,
    plugins: [new RangeRequestsPlugin()],
  }),
)

const scaricaMappa = async (url: string) => {
  const cache = await caches.open(CACHE_MAPPA)
  const risposta = await fetch(url, { cache: 'reload' })
  if (!risposta.ok) throw new Error(`Download mappa fallito: ${risposta.status}`)
  await cache.put(url, risposta)
}

const mappaInCache = async (url: string) => {
  const cache = await caches.open(CACHE_MAPPA)
  return (await cache.match(url)) !== undefined
}

let audioSospeso = false

const attendiRipresa = async () => {
  while (audioSospeso) await new Promise((prosegui) => setTimeout(prosegui, 200))
}

const scaricaAudio = async (urls: string[], avvisa: (fatti: number) => void) => {
  const cache = await caches.open(CACHE_AUDIO)
  let fatti = 0
  for (const url of urls) {
    await attendiRipresa()
    if (!(await cache.match(url))) {
      const risposta = await fetch(url, { cache: 'reload' })
      if (!risposta.ok) throw new Error(`Download audio fallito: ${risposta.status}`)
      await cache.put(url, risposta)
    }
    fatti += 1
    avvisa(fatti)
  }
}

const audioInCache = async (urls: string[]) => {
  const cache = await caches.open(CACHE_AUDIO)
  const trovati = await Promise.all(urls.map((url) => cache.match(url)))
  return trovati.filter((risposta) => risposta !== undefined).length
}

self.addEventListener('message', (evento) => {
  const dati = evento.data as { tipo?: string; url?: string; urls?: string[] } | undefined
  if (!dati?.tipo) return

  if (dati.tipo === 'PAUSA_AUDIO') {
    audioSospeso = true
    return
  }

  if (dati.tipo === 'RIPRENDI_AUDIO') {
    audioSospeso = false
    return
  }

  if (dati.tipo === 'SCARICA_AUDIO' && dati.urls) {
    const urls = dati.urls
    audioSospeso = false
    evento.waitUntil(
      scaricaAudio(urls, (fatti) =>
        evento.source?.postMessage({ tipo: 'AUDIO_PROGRESSO', fatti, totale: urls.length }),
      )
        .then(() => evento.source?.postMessage({ tipo: 'AUDIO_PRONTO', totale: urls.length }))
        .catch((errore: Error) =>
          evento.source?.postMessage({ tipo: 'AUDIO_ERRORE', messaggio: errore.message }),
        ),
    )
    return
  }

  if (dati.tipo === 'STATO_AUDIO' && dati.urls) {
    const urls = dati.urls
    evento.waitUntil(
      audioInCache(urls).then((presenti) =>
        evento.source?.postMessage({ tipo: 'STATO_AUDIO', presenti, totale: urls.length }),
      ),
    )
    return
  }

  if (dati.tipo === 'SALTA_ATTESA') {
    self.skipWaiting()
    return
  }

  if (dati.tipo === 'SCARICA_MAPPA' && dati.url) {
    const url = dati.url
    evento.waitUntil(
      scaricaMappa(url)
        .then(() => evento.source?.postMessage({ tipo: 'MAPPA_PRONTA', url }))
        .catch((errore: Error) =>
          evento.source?.postMessage({ tipo: 'MAPPA_ERRORE', url, messaggio: errore.message }),
        ),
    )
    return
  }

  if (dati.tipo === 'STATO_MAPPA' && dati.url) {
    const url = dati.url
    evento.waitUntil(
      mappaInCache(url).then((presente) =>
        evento.source?.postMessage({ tipo: 'STATO_MAPPA', url, presente }),
      ),
    )
  }
})
