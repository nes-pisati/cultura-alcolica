import { useCallback, useEffect, useMemo, useState } from 'react'
import { TAPPE } from '../dati/tappe'

export type Schermata =
  | 'benvenuto'
  | 'installa'
  | 'download'
  | 'inizia'
  | 'mappa'
  | 'dettaglio'
  | 'player'
  | 'conto'
  | 'elenco'
  | 'fine'

export type Ombra = {
  tappaId: number
  ora: string
}

const oraCorrente = () =>
  new Date().toLocaleTimeString('it-IT', { hour: '2-digit', minute: '2-digit' })

export function useTour() {
  const [schermata, setSchermata] = useState<Schermata>('benvenuto')
  const [audioSbloccato, setAudioSbloccato] = useState(false)
  const [indiceAttiva, setIndiceAttiva] = useState(0)
  const [completate, setCompletate] = useState<number[]>([])
  const [ombre, setOmbre] = useState<Ombra[]>([])
  const [inRiproduzione, setInRiproduzione] = useState(false)
  const [posizioneAudio, setPosizioneAudio] = useState(0)
  const [arrivo, setArrivo] = useState(false)
  const [demo, setDemo] = useState(false)
  const [inizio, setInizio] = useState<string | null>(null)
  const [inizioIstante, setInizioIstante] = useState<number | null>(null)

  const tappaAttiva = TAPPE[indiceAttiva]

  useEffect(() => {
    if (!inRiproduzione) return
    const timer = window.setInterval(() => setPosizioneAudio((valore) => valore + 1), 1000)
    return () => window.clearInterval(timer)
  }, [inRiproduzione])

  useEffect(() => {
    if (posizioneAudio < tappaAttiva.durataAudio) return
    setInRiproduzione(false)
    setPosizioneAudio(tappaAttiva.durataAudio)
  }, [posizioneAudio, tappaAttiva.durataAudio])

  const vai = useCallback((prossima: Schermata) => setSchermata(prossima), [])

  const sbloccaAudio = useCallback(() => {
    setAudioSbloccato(true)
    setInizio(oraCorrente())
    setInizioIstante(Date.now())
    setSchermata('mappa')
  }, [])

  const riproduci = useCallback(() => setInRiproduzione(true), [])
  const metti = useCallback(() => setInRiproduzione(false), [])

  const alterna = useCallback(() => setInRiproduzione((valore) => !valore), [])

  const salta = useCallback(
    (secondi: number) =>
      setPosizioneAudio((valore) =>
        Math.min(Math.max(valore + secondi, 0), tappaAttiva.durataAudio),
      ),
    [tappaAttiva.durataAudio],
  )

  const apriTappa = useCallback((id: number) => {
    const indice = TAPPE.findIndex((tappa) => tappa.id === id)
    if (indice < 0) return
    setIndiceAttiva(indice)
    setPosizioneAudio(0)
    setSchermata('dettaglio')
  }, [])

  const segnalaArrivo = useCallback(() => {
    setArrivo(true)
    setPosizioneAudio(0)
    setInRiproduzione(true)
  }, [])

  const entraNellaTappa = useCallback(() => {
    setArrivo(false)
    setSchermata('dettaglio')
  }, [])

  const annullaArrivo = useCallback(() => {
    setArrivo(false)
    setInRiproduzione(false)
    setPosizioneAudio(0)
  }, [])

  const concludiTappa = useCallback(() => {
    setInRiproduzione(false)
    setPosizioneAudio(0)
    setCompletate((elenco) =>
      elenco.includes(tappaAttiva.id) ? elenco : [...elenco, tappaAttiva.id],
    )
    if (indiceAttiva === TAPPE.length - 1) {
      setSchermata('fine')
      return
    }
    setIndiceAttiva(indiceAttiva + 1)
    setSchermata('mappa')
  }, [indiceAttiva, tappaAttiva.id])

  const aggiungiOmbra = useCallback(
    () => setOmbre((elenco) => [{ tappaId: tappaAttiva.id, ora: oraCorrente() }, ...elenco]),
    [tappaAttiva.id],
  )

  const togliOmbra = useCallback(() => setOmbre((elenco) => elenco.slice(1)), [])

  const azzera = useCallback(() => {
    setIndiceAttiva(0)
    setCompletate([])
    setOmbre([])
    setInRiproduzione(false)
    setPosizioneAudio(0)
    setArrivo(false)
    setInizio(null)
    setInizioIstante(null)
    setAudioSbloccato(false)
    setSchermata('benvenuto')
  }, [])

  const avanzamento = useMemo(
    () => ({
      completate: completate.length,
      totale: TAPPE.length,
      metriRimanenti: TAPPE.slice(indiceAttiva + 1).reduce(
        (somma, tappa) => somma + tappa.distanzaDallaPrecedente,
        0,
      ),
    }),
    [completate.length, indiceAttiva],
  )

  return {
    schermata,
    audioSbloccato,
    tappaAttiva,
    indiceAttiva,
    completate,
    ombre,
    inRiproduzione,
    posizioneAudio,
    arrivo,
    demo,
    inizio,
    inizioIstante,
    avanzamento,
    vai,
    sbloccaAudio,
    riproduci,
    metti,
    alterna,
    salta,
    apriTappa,
    segnalaArrivo,
    entraNellaTappa,
    annullaArrivo,
    concludiTappa,
    aggiungiOmbra,
    togliOmbra,
    azzera,
    setDemo,
  }
}

export type Tour = ReturnType<typeof useTour>
