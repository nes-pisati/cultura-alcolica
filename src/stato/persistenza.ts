import { TAPPE } from '../dati/tappe'
import type { Ombra, Schermata } from './useTour'

const CHIAVE = 'cultura-alcolica:tour'
const VERSIONE = 1

export type StatoSalvato = {
  schermata: Schermata
  indiceAttiva: number
  completate: number[]
  attivate: number[]
  ombre: Ombra[]
  inizio: string | null
  inizioIstante: number | null
}

const numeri = (valore: unknown) =>
  Array.isArray(valore) ? valore.filter((voce): voce is number => typeof voce === 'number') : []

const ombreValide = (valore: unknown): Ombra[] =>
  Array.isArray(valore)
    ? valore.filter(
        (voce): voce is Ombra =>
          typeof voce === 'object' &&
          voce !== null &&
          typeof (voce as Ombra).tappaId === 'number' &&
          typeof (voce as Ombra).ora === 'string',
      )
    : []

export const leggiStato = (): StatoSalvato | null => {
  try {
    const grezzo = localStorage.getItem(CHIAVE)
    if (!grezzo) return null
    const dati = JSON.parse(grezzo) as Partial<StatoSalvato> & { versione?: number }
    if (dati.versione !== VERSIONE || typeof dati.schermata !== 'string') return null
    return {
      schermata: dati.schermata,
      indiceAttiva: Math.min(Math.max(dati.indiceAttiva ?? 0, 0), TAPPE.length - 1),
      completate: numeri(dati.completate),
      attivate: numeri(dati.attivate),
      ombre: ombreValide(dati.ombre),
      inizio: typeof dati.inizio === 'string' ? dati.inizio : null,
      inizioIstante: typeof dati.inizioIstante === 'number' ? dati.inizioIstante : null,
    }
  } catch {
    return null
  }
}

export const salvaStato = (stato: StatoSalvato) => {
  try {
    localStorage.setItem(CHIAVE, JSON.stringify({ ...stato, versione: VERSIONE }))
  } catch {
    return
  }
}

export const svuotaStato = () => {
  try {
    localStorage.removeItem(CHIAVE)
  } catch {
    return
  }
}
