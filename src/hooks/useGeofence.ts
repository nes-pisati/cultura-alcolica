import { useEffect } from 'react'
import type { Tappa } from '../dati/tappe'
import type { Posizione } from './usePosizione'
import { distanzaMetri } from '../utilita/formato'

export const TOLLERANZA_MASSIMA = 40

export const raggioEffettivo = (raggio: number, accuratezza: number) =>
  raggio + Math.min(accuratezza, TOLLERANZA_MASSIMA)

export function useGeofence(
  tappa: Tappa,
  posizione: Posizione,
  attivo: boolean,
  onArrivo: () => void,
) {
  useEffect(() => {
    if (!attivo) return
    if (posizione.stato !== 'buona' && posizione.stato !== 'imprecisa') return
    if (!posizione.coordinate || posizione.accuratezza === null) return

    const distanza = distanzaMetri(posizione.coordinate, tappa.coordinate)
    if (distanza > raggioEffettivo(tappa.raggio, posizione.accuratezza)) return

    onArrivo()
  }, [attivo, posizione, tappa, onArrivo])
}
