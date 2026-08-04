/// <reference lib="webworker" />
import { cleanupOutdatedCaches, precacheAndRoute } from 'workbox-precaching'
import { registerRoute } from 'workbox-routing'
import { CacheFirst } from 'workbox-strategies'
import { RangeRequestsPlugin } from 'workbox-range-requests'

declare const self: ServiceWorkerGlobalScope

const CACHE_MAPPA = 'mappa-pmtiles'

cleanupOutdatedCaches()
precacheAndRoute(self.__WB_MANIFEST)

const isPmtiles = ({ url }: { url: URL }) => url.pathname.endsWith('.pmtiles')

registerRoute(
  isPmtiles,
  new CacheFirst({
    cacheName: CACHE_MAPPA,
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

self.addEventListener('message', (evento) => {
  const dati = evento.data as { tipo?: string; url?: string } | undefined
  if (!dati?.tipo) return

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
