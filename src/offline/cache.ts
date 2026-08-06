export const CACHE_MAPPA = 'mappa-pmtiles'
export const CACHE_AUDIO = 'audioguida'

export const svuotaOffline = async () => {
  if (!('caches' in globalThis)) return
  await Promise.all([caches.delete(CACHE_MAPPA), caches.delete(CACHE_AUDIO)])
}
