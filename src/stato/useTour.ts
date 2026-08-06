import { useCallback, useEffect, useMemo, useState } from 'react'
import { urlAudio } from '../audio/cacheAudio'
import { TAPPE } from '../dati/tappe'
import { useAudioGuida } from '../hooks/useAudioGuida'
import { svuotaOffline } from '../offline/cache'
import { leggiStato, salvaStato, svuotaStato } from './persistenza'

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

export const SCHERMATE_TOUR: Schermata[] = ['mappa', 'dettaglio', 'player', 'conto', 'elenco']

const oraCorrente = () =>
  new Date().toLocaleTimeString('it-IT', { hour: '2-digit', minute: '2-digit' })

const schermataDaRiprendere = (salvata: Schermata) =>
  salvata === 'player' ? 'dettaglio' : salvata

export function useTour() {
  const [salvato] = useState(leggiStato)
  const ripresa = salvato !== null && SCHERMATE_TOUR.includes(salvato.schermata)

  const [schermata, setSchermata] = useState<Schermata>(
    ripresa ? 'inizia' : (salvato?.schermata ?? 'benvenuto'),
  )
  const [daRiprendere, setDaRiprendere] = useState<Schermata | null>(
    ripresa && salvato ? schermataDaRiprendere(salvato.schermata) : null,
  )
  const [audioSbloccato, setAudioSbloccato] = useState(false)
  const [indiceAttiva, setIndiceAttiva] = useState(salvato?.indiceAttiva ?? 0)
  const [completate, setCompletate] = useState<number[]>(salvato?.completate ?? [])
  const [attivate, setAttivate] = useState<number[]>(salvato?.attivate ?? [])
  const [ombre, setOmbre] = useState<Ombra[]>(salvato?.ombre ?? [])
  const [arrivo, setArrivo] = useState(false)
  const [demo, setDemo] = useState(false)
  const [inizio, setInizio] = useState<string | null>(salvato?.inizio ?? null)
  const [inizioIstante, setInizioIstante] = useState<number | null>(salvato?.inizioIstante ?? null)

  const tappaAttiva = TAPPE[indiceAttiva]
  const sorgenteAudio = tappaAttiva.paragrafi ? urlAudio(tappaAttiva.id) : null

  const {
    inRiproduzione,
    posizione: posizioneAudio,
    durata,
    sblocca,
    riproduci,
    metti,
    alterna,
    salta,
    riavvia,
    azzera: azzeraAudio,
  } = useAudioGuida(sorgenteAudio)

  const durataAudio = durata || tappaAttiva.durataAudio || 0

  useEffect(() => {
    if (schermata === 'fine' || daRiprendere) return
    salvaStato({ schermata, indiceAttiva, completate, attivate, ombre, inizio, inizioIstante })
  }, [schermata, daRiprendere, indiceAttiva, completate, attivate, ombre, inizio, inizioIstante])

  const vai = useCallback((prossima: Schermata) => setSchermata(prossima), [])

  const sbloccaAudio = useCallback(() => {
    sblocca()
    setAudioSbloccato(true)
    setInizio((valore) => valore ?? oraCorrente())
    setInizioIstante((valore) => valore ?? Date.now())
    setSchermata(daRiprendere ?? 'mappa')
    setDaRiprendere(null)
  }, [daRiprendere, sblocca])

  const apriTappa = useCallback(
    (id: number) => {
      const indice = TAPPE.findIndex((tappa) => tappa.id === id)
      if (indice < 0) return
      setIndiceAttiva(indice)
      azzeraAudio()
      setSchermata('dettaglio')
    },
    [azzeraAudio],
  )

  const segnalaArrivo = useCallback(() => {
    setArrivo(true)
    riavvia()
    if (sorgenteAudio) riproduci()
    setAttivate((elenco) =>
      elenco.includes(tappaAttiva.id) ? elenco : [...elenco, tappaAttiva.id],
    )
  }, [riavvia, riproduci, sorgenteAudio, tappaAttiva.id])

  const entraNellaTappa = useCallback(() => {
    setArrivo(false)
    setSchermata('dettaglio')
  }, [])

  const annullaArrivo = useCallback(() => {
    setArrivo(false)
    azzeraAudio()
  }, [azzeraAudio])

  const terminaTour = useCallback(() => {
    azzeraAudio()
    setArrivo(false)
    setDaRiprendere(null)
    svuotaStato()
    void svuotaOffline()
    setSchermata('fine')
  }, [azzeraAudio])

  const concludiTappa = useCallback(() => {
    azzeraAudio()
    setCompletate((elenco) =>
      elenco.includes(tappaAttiva.id) ? elenco : [...elenco, tappaAttiva.id],
    )
    if (indiceAttiva === TAPPE.length - 1) {
      terminaTour()
      return
    }
    setIndiceAttiva(indiceAttiva + 1)
    setSchermata('mappa')
  }, [azzeraAudio, indiceAttiva, tappaAttiva.id, terminaTour])

  const aggiungiOmbra = useCallback(
    () => setOmbre((elenco) => [{ tappaId: tappaAttiva.id, ora: oraCorrente() }, ...elenco]),
    [tappaAttiva.id],
  )

  const togliOmbra = useCallback(() => setOmbre((elenco) => elenco.slice(1)), [])

  const azzera = useCallback(() => {
    setIndiceAttiva(0)
    setCompletate([])
    setAttivate([])
    setOmbre([])
    azzeraAudio()
    setArrivo(false)
    setInizio(null)
    setInizioIstante(null)
    setAudioSbloccato(false)
    setDaRiprendere(null)
    svuotaStato()
    setSchermata('benvenuto')
  }, [azzeraAudio])

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
    ripresa: daRiprendere !== null,
    tourInCorso: SCHERMATE_TOUR.includes(schermata),
    audioSbloccato,
    tappaAttiva,
    indiceAttiva,
    completate,
    attivate,
    ombre,
    inRiproduzione,
    posizioneAudio,
    durataAudio,
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
    terminaTour,
    aggiungiOmbra,
    togliOmbra,
    azzera,
    setDemo,
  }
}

export type Tour = ReturnType<typeof useTour>
