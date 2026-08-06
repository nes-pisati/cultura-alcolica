import { TAPPE } from '../dati/tappe'

export const urlAudio = (id: number) => `${import.meta.env.BASE_URL}audio/tappa-${id}.m4a`

export const URL_AUDIO = TAPPE.filter((tappa) => tappa.paragrafi).map((tappa) =>
  urlAudio(tappa.id),
)

type RispostaAudio = {
  tipo: 'AUDIO_PROGRESSO' | 'AUDIO_PRONTO' | 'AUDIO_ERRORE' | 'STATO_AUDIO'
  fatti?: number
  totale?: number
  presenti?: number
  messaggio?: string
}

const parlaAlServiceWorker = (richiesta: { tipo: string }) => {
  if (!('serviceWorker' in navigator)) return
  navigator.serviceWorker.ready
    .then((registrazione) => registrazione.active?.postMessage(richiesta))
    .catch(() => undefined)
}

const SILENZIO_MASSIMO = 45000

const attendi = (
  richiesta: { tipo: string; urls: string[] },
  finali: RispostaAudio['tipo'][],
  onProgresso?: (fatti: number, totale: number) => void,
) =>
  new Promise<RispostaAudio>((risolvi, rifiuta) => {
    if (!('serviceWorker' in navigator)) {
      rifiuta(new Error('Service worker non disponibile'))
      return
    }

    let scadenza = 0

    const smetti = () => {
      window.clearTimeout(scadenza)
      navigator.serviceWorker.removeEventListener('message', ascolta)
    }

    const riarma = () => {
      window.clearTimeout(scadenza)
      scadenza = window.setTimeout(() => {
        smetti()
        rifiuta(new Error('Il service worker non ha risposto'))
      }, SILENZIO_MASSIMO)
    }

    const ascolta = (evento: MessageEvent) => {
      const dati = evento.data as RispostaAudio | undefined
      if (!dati?.tipo) return

      if (dati.tipo === 'AUDIO_PROGRESSO') {
        riarma()
        onProgresso?.(dati.fatti ?? 0, dati.totale ?? richiesta.urls.length)
        return
      }

      if (!finali.includes(dati.tipo)) return
      smetti()
      risolvi(dati)
    }

    navigator.serviceWorker.addEventListener('message', ascolta)
    riarma()
    navigator.serviceWorker.ready
      .then((registrazione) => {
        registrazione.waiting?.postMessage({ tipo: 'SALTA_ATTESA' })
        ;(registrazione.waiting ?? registrazione.active)?.postMessage(richiesta)
      })
      .catch((errore: Error) => {
        smetti()
        rifiuta(errore)
      })
  })

export const audioGiaScaricati = async () => {
  const risposta = await attendi({ tipo: 'STATO_AUDIO', urls: URL_AUDIO }, ['STATO_AUDIO'])
  return risposta.presenti ?? 0
}

export const scaricaAudio = async (
  onProgresso: (fatti: number, totale: number) => void,
) => {
  const risposta = await attendi(
    { tipo: 'SCARICA_AUDIO', urls: URL_AUDIO },
    ['AUDIO_PRONTO', 'AUDIO_ERRORE'],
    onProgresso,
  )
  if (risposta.tipo === 'AUDIO_ERRORE')
    throw new Error(risposta.messaggio ?? 'Download audio fallito')
}

export const sospendiAudio = () => parlaAlServiceWorker({ tipo: 'PAUSA_AUDIO' })

export const riprendiAudio = () => parlaAlServiceWorker({ tipo: 'RIPRENDI_AUDIO' })
