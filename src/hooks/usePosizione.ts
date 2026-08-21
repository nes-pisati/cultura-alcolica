import { useEffect, useState } from 'react'

export type StatoPosizione = 'attesa' | 'buona' | 'imprecisa' | 'scartata' | 'negata' | 'assente'

export const ACCURATEZZA_MASSIMA = 60
export const ACCURATEZZA_INCERTA = 25

export type Posizione = {
  coordinate: [number, number] | null
  accuratezza: number | null
  stato: StatoPosizione
}

const statoDaAccuratezza = (accuratezza: number): StatoPosizione => {
  if (accuratezza > ACCURATEZZA_MASSIMA) return 'scartata'
  if (accuratezza > ACCURATEZZA_INCERTA) return 'imprecisa'
  return 'buona'
}

export function usePosizione(attivo: boolean): Posizione {
  const [posizione, setPosizione] = useState<Posizione>({
    coordinate: null,
    accuratezza: null,
    stato: 'attesa',
  })

  useEffect(() => {
    if (!attivo) return
    if (!('geolocation' in navigator)) {
      setPosizione({ coordinate: null, accuratezza: null, stato: 'assente' })
      return
    }

    const osservatore = navigator.geolocation.watchPosition(
      ({ coords }) => {
        const stato = statoDaAccuratezza(coords.accuracy)
        setPosizione({
          coordinate: stato === 'scartata' ? null : [coords.longitude, coords.latitude],
          accuratezza: coords.accuracy,
          stato,
        })
      },
      (errore) => {
        setPosizione({
          coordinate: null,
          accuratezza: null,
          stato: errore.code === errore.PERMISSION_DENIED ? 'negata' : 'assente',
        })
      },
      { enableHighAccuracy: true, maximumAge: 5000, timeout: 15000 },
    )

    return () => navigator.geolocation.clearWatch(osservatore)
  }, [attivo])

  return posizione
}
