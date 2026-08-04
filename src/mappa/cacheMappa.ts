import { URL_MAPPA } from './stile'

type RispostaServiceWorker = {
  tipo: 'MAPPA_PRONTA' | 'MAPPA_ERRORE' | 'STATO_MAPPA'
  url: string
  presente?: boolean
  messaggio?: string
}

const supportato = () => 'serviceWorker' in navigator

const chiedi = (richiesta: { tipo: string; url: string }, attese: string[]) =>
  new Promise<RispostaServiceWorker>((risolvi, rifiuta) => {
    if (!supportato()) {
      rifiuta(new Error('Service worker non disponibile'))
      return
    }

    const ascolta = (evento: MessageEvent) => {
      const dati = evento.data as RispostaServiceWorker | undefined
      if (!dati || dati.url !== richiesta.url || !attese.includes(dati.tipo)) return
      navigator.serviceWorker.removeEventListener('message', ascolta)
      risolvi(dati)
    }

    navigator.serviceWorker.addEventListener('message', ascolta)
    navigator.serviceWorker.ready
      .then((registrazione) => registrazione.active?.postMessage(richiesta))
      .catch((errore: Error) => {
        navigator.serviceWorker.removeEventListener('message', ascolta)
        rifiuta(errore)
      })
  })

export const mappaScaricata = async () => {
  const risposta = await chiedi({ tipo: 'STATO_MAPPA', url: URL_MAPPA }, ['STATO_MAPPA'])
  return risposta.presente === true
}

export const scaricaMappa = async () => {
  const risposta = await chiedi({ tipo: 'SCARICA_MAPPA', url: URL_MAPPA }, [
    'MAPPA_PRONTA',
    'MAPPA_ERRORE',
  ])
  if (risposta.tipo === 'MAPPA_ERRORE') throw new Error(risposta.messaggio ?? 'Download fallito')
}
