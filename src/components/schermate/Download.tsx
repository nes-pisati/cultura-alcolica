import { useEffect, useState } from 'react'
import { mappaScaricata, scaricaMappa } from '../../mappa/cacheMappa'
import { NUMERI_TOUR, PESI_DOWNLOAD } from '../../dati/tappe'
import { formattaMegabyte } from '../../utilita/formato'
import {
  BarraProgressoDownload,
  type StatoVoce,
} from '../base/BarraProgressoDownload'
import { IconaDocumento, IconaMappa, IconaOnde, IconaRete } from '../base/Icone'
import { PulsanteGrande, PulsantePillola } from '../base/Pulsanti'
import { useRete } from '../../hooks/useRete'

type Fase = 'riposo' | 'corso' | 'pausa' | 'fatto' | 'errore'

const TOTALE = PESI_DOWNLOAD.mappa + PESI_DOWNLOAD.audio + PESI_DOWNLOAD.testi

const voci = [
  { nome: 'Mappa di Venezia', peso: PESI_DOWNLOAD.mappa, icona: <IconaMappa colore="#23201d" /> },
  {
    nome: `Audio di ${NUMERI_TOUR.conAudio} tappe`,
    peso: PESI_DOWNLOAD.audio,
    icona: <IconaOnde colore="#23201d" />,
  },
  { nome: 'Testi e percorso', peso: PESI_DOWNLOAD.testi, icona: <IconaDocumento colore="#23201d" /> },
]

export function Download({ onAvanti }: { onAvanti: () => void }) {
  const online = useRete()
  const [fase, setFase] = useState<Fase>('riposo')
  const [mappaPronta, setMappaPronta] = useState(false)
  const [audioScaricati, setAudioScaricati] = useState(0)
  const [testiPronti, setTestiPronti] = useState(false)

  useEffect(() => {
    mappaScaricata()
      .then((presente) => {
        setMappaPronta(presente)
        if (presente) {
          setAudioScaricati(PESI_DOWNLOAD.audio)
          setTestiPronti(true)
          setFase('fatto')
        }
      })
      .catch(() => setMappaPronta(false))
  }, [])

  useEffect(() => {
    if (fase !== 'corso' || !mappaPronta) return
    if (audioScaricati >= PESI_DOWNLOAD.audio) {
      setTestiPronti(true)
      setFase('fatto')
      return
    }
    const timer = window.setTimeout(
      () => setAudioScaricati((valore) => Math.min(valore + 0.9, PESI_DOWNLOAD.audio)),
      300,
    )
    return () => window.clearTimeout(timer)
  }, [fase, mappaPronta, audioScaricati])

  const avvia = () => {
    setFase('corso')
    if (mappaPronta) return
    scaricaMappa()
      .then(() => setMappaPronta(true))
      .catch(() => setFase('errore'))
  }

  const scaricati =
    (mappaPronta ? PESI_DOWNLOAD.mappa : 0) +
    audioScaricati +
    (testiPronti ? PESI_DOWNLOAD.testi : 0)
  const percentuale = Math.round((scaricati / TOTALE) * 100)

  const statoAudio: StatoVoce =
    audioScaricati >= PESI_DOWNLOAD.audio
      ? 'salvata'
      : fase === 'pausa'
        ? 'interrotta'
        : audioScaricati > 0
          ? 'corso'
          : 'attesa'

  if (fase === 'riposo') {
    return (
      <div className="schermata">
        <div className="schermata__corpo">
          <div className="sovratitolo">Passo 3 di 4</div>
          <h1 className="titolo-schermata">Scarica il tour</h1>
          <p className="testo-narrativo">
            Una volta scaricato, a Venezia non serve rete. Meglio farlo ora, con il wi-fi.
          </p>
          <div className="download__elenco">
            {voci.map((voce) => (
              <div className="download__voce" key={voce.nome}>
                <span className="download__icona">{voce.icona}</span>
                <span className="download__nome">{voce.nome}</span>
                <span className="download__peso">{formattaMegabyte(voce.peso)}</span>
              </div>
            ))}
            <div className="download__totale">
              <span className="download__totale-etichetta">Totale</span>
              <span className="riga-indice__punti" />
              <span className="download__totale-valore">{formattaMegabyte(TOTALE)}</span>
            </div>
          </div>
          <div className="schermata__piede">
            <div className="nota-piede">
              <IconaRete colore="#6b645c" />
              {online ? 'Sei connesso alla rete' : 'Sei senza rete: serve una connessione'}
            </div>
            <PulsanteGrande onClick={avvia} disabled={!online}>
              {`Scarica ${formattaMegabyte(TOTALE)}`}
            </PulsanteGrande>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="schermata">
      <div className="schermata__corpo">
        <div className="sovratitolo">
          {fase === 'fatto' ? 'Passo 3 di 4 · completato' : 'Passo 3 di 4 · in corso'}
        </div>
        <h1 className="titolo-schermata">{fase === 'fatto' ? 'Tutto scaricato' : 'Sto scaricando'}</h1>
        <div className="download__percentuale">
          <span className="download__percentuale-numero">
            {percentuale}
            <span className="download__percentuale-simbolo">%</span>
          </span>
          <span className="download__percentuale-peso">
            {`${formattaMegabyte(scaricati)} di ${formattaMegabyte(TOTALE)}`}
          </span>
        </div>
        <div className="download__barra-totale">
          <div className="download__barra-totale-riempimento" style={{ width: `${percentuale}%` }} />
        </div>
        <div className="download__voci-avanzamento">
          <BarraProgressoDownload
            nome="Mappa di Venezia"
            scaricati={mappaPronta ? PESI_DOWNLOAD.mappa : 0}
            totale={PESI_DOWNLOAD.mappa}
            stato={mappaPronta ? 'salvata' : 'corso'}
          />
          <BarraProgressoDownload
            nome={`Audio di ${NUMERI_TOUR.conAudio} tappe`}
            scaricati={audioScaricati}
            totale={PESI_DOWNLOAD.audio}
            stato={statoAudio}
            nota={
              statoAudio === 'corso'
                ? `Tappa ${Math.max(
                    1,
                    Math.ceil((audioScaricati / PESI_DOWNLOAD.audio) * NUMERI_TOUR.conAudio),
                  )} di ${NUMERI_TOUR.conAudio}`
                : undefined
            }
          />
          <BarraProgressoDownload
            nome="Testi e percorso"
            scaricati={testiPronti ? PESI_DOWNLOAD.testi : 0}
            totale={PESI_DOWNLOAD.testi}
            stato={testiPronti ? 'salvata' : 'attesa'}
          />
        </div>
        <div className="schermata__piede">
          {fase === 'errore' && (
            <div className="download__promemoria">
              Il download non è riuscito. Controlla la rete e riprova.
            </div>
          )}
          {fase !== 'fatto' && fase !== 'errore' && (
            <div className="download__promemoria">
              Resta su questa schermata. Se esci, il download riprende da dove era.
            </div>
          )}
          {fase === 'fatto' && <PulsanteGrande onClick={onAvanti}>Vai al tour</PulsanteGrande>}
          {fase === 'errore' && <PulsanteGrande onClick={avvia}>Riprova</PulsanteGrande>}
          {(fase === 'corso' || fase === 'pausa') && (
            <>
              <PulsanteGrande disabled>Scarico…</PulsanteGrande>
              <PulsantePillola
                neutro
                largo
                className="download__pausa"
                onClick={() => setFase(fase === 'pausa' ? 'corso' : 'pausa')}
              >
                {fase === 'pausa' ? 'Riprendi' : 'Metti in pausa'}
              </PulsantePillola>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
