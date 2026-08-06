import type { Tappa } from '../../dati/tappe'
import { formattaResiduo, formattaTempo } from '../../utilita/formato'
import {
  IconaAvanti15,
  IconaGiu,
  IconaIndietro15,
  IconaPausa,
  IconaPlay,
} from '../base/Icone'
import { PulsanteTondo } from '../base/Pulsanti'

type Proprieta = {
  tappa: Tappa
  numeroTappa: number
  totaleTappe: number
  inRiproduzione: boolean
  posizione: number
  onChiudi: () => void
  onAlterna: () => void
  onSalta: (secondi: number) => void
}

export function SchermataPlayer({
  tappa,
  numeroTappa,
  totaleTappe,
  inRiproduzione,
  posizione,
  onChiudi,
  onAlterna,
  onSalta,
}: Proprieta) {
  const percentuale = Math.min((posizione / tappa.durataAudio) * 100, 100)

  return (
    <div className="schermata">
      <div className="schermata__testata schermata__testata--nuda">
        <PulsanteTondo onClick={onChiudi} aria-label="Chiudi il player">
          <IconaGiu colore="#23201d" />
        </PulsanteTondo>
        <span className="sovratitolo sovratitolo--piccolo schermata__testata-centro">
          Audioguida
        </span>
        <span className="schermata__testata-spazio" />
      </div>

      <div className="player-esteso__centro">
        <div className="dettaglio__immagine dettaglio__immagine--quadrata">
          <span className="dettaglio__segnaposto">immagine della tappa · 1:1</span>
        </div>
        <div className="sovratitolo sovratitolo--piccolo">
          {`Tappa ${numeroTappa} di ${totaleTappe} · ${tappa.tipo}`}
        </div>
        <h1 className="player-esteso__titolo">{tappa.titolo}</h1>
      </div>

      <div className="player-esteso__comandi">
        <div className="player-esteso__barra">
          <div className="player-esteso__riempimento" style={{ width: `${percentuale}%` }} />
          <div className="player-esteso__maniglia" style={{ left: `${percentuale}%` }} />
        </div>
        <div className="player-esteso__tempi">
          <span>{formattaTempo(posizione)}</span>
          <span className="player-esteso__tempo-residuo">
            {formattaResiduo(tappa.durataAudio - posizione)}
          </span>
        </div>
        <div className="player-esteso__tasti">
          <button
            type="button"
            className="player-esteso__salto"
            onClick={() => onSalta(-15)}
            aria-label="Indietro di 15 secondi"
          >
            <IconaIndietro15 colore="#23201d" />
            <span>15 s</span>
          </button>
          <button
            type="button"
            className="player-esteso__play"
            onClick={onAlterna}
            aria-label={inRiproduzione ? 'Metti in pausa' : 'Riprendi'}
          >
            {inRiproduzione ? (
              <IconaPausa dimensione={44} colore="#f5efe6" />
            ) : (
              <IconaPlay dimensione={44} colore="#f5efe6" />
            )}
          </button>
          <button
            type="button"
            className="player-esteso__salto"
            onClick={() => onSalta(15)}
            aria-label="Avanti di 15 secondi"
          >
            <IconaAvanti15 colore="#23201d" />
            <span>15 s</span>
          </button>
        </div>
      </div>
    </div>
  )
}
