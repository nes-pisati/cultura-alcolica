export const formattaTempo = (secondi: number) => {
  const minuti = Math.floor(Math.max(secondi, 0) / 60)
  const resto = Math.floor(Math.max(secondi, 0) % 60)
  return `${minuti}:${resto.toString().padStart(2, '0')}`
}

export const formattaResiduo = (secondi: number) => `−${formattaTempo(secondi)}`

export const formattaMegabyte = (valore: number) =>
  `${valore.toFixed(1).replace('.', ',')} MB`

export const formattaDistanza = (metri: number) =>
  metri >= 1000 ? `${(metri / 1000).toFixed(1).replace('.', ',')} km` : `${Math.round(metri)} m`

export const distanzaMetri = (
  [lngA, latA]: [number, number],
  [lngB, latB]: [number, number],
) => {
  const raggioTerrestre = 6371000
  const radianti = (gradi: number) => (gradi * Math.PI) / 180
  const deltaLat = radianti(latB - latA)
  const deltaLng = radianti(lngB - lngA)
  const a =
    Math.sin(deltaLat / 2) ** 2 +
    Math.cos(radianti(latA)) * Math.cos(radianti(latB)) * Math.sin(deltaLng / 2) ** 2
  return 2 * raggioTerrestre * Math.asin(Math.sqrt(a))
}
