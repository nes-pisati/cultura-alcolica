import { useEffect, useRef, useState } from 'react'
import { PERCORSO } from '../dati/tappe'

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

export function usePosizione(demo: boolean, attivo: boolean): Posizione {
  const [posizione, setPosizione] = useState<Posizione>({
    coordinate: null,
    accuratezza: null,
    stato: 'attesa',
  })
  const passoDemo = useRef(0)

  useEffect(() => {
    if (!demo || !attivo) return
    passoDemo.current = 0
    const avanza = () => {
      const punto = PERCORSO[passoDemo.current % PERCORSO.length]
      passoDemo.current += 1
      setPosizione({ coordinate: punto, accuratezza: 12, stato: 'buona' })
    }
    avanza()
    const timer = window.setInterval(avanza, 4000)
    return () => window.clearInterval(timer)
  }, [demo, attivo])

  useEffect(() => {
    if (demo || !attivo) return
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
  }, [demo, attivo])

  return posizione
}
