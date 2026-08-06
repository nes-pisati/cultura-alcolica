import { formattaResiduo, formattaTempo } from '../../utilita/formato'
import { IconaPausa, IconaPlay } from './Icone'

type Proprieta = {
  inRiproduzione: boolean
  posizione: number
  durata: number
  onAlterna: () => void
  onSalta?: (secondi: number) => void
  onTesto?: () => void
}

export function PlayerCompatto({
  inRiproduzione,
  posizione,
  durata,
  onAlterna,
  onSalta,
  onTesto,
}: Proprieta) {
  const percentuale = durata === 0 ? 0 : Math.min((posizione / durata) * 100, 100)

  return (
    <div className={`player-compatto${inRiproduzione ? ' player-compatto--in-ascolto' : ''}`}>
      <div className="player-compatto__riga">
        <button
          type="button"
          className="player-compatto__play"
          onClick={onAlterna}
          aria-label={inRiproduzione ? 'Metti in pausa' : 'Ascolta la tappa'}
        >
          {inRiproduzione ? <IconaPausa colore="#f5efe6" /> : <IconaPlay colore="#f5efe6" />}
        </button>
        <div className="player-compatto__corpo">
          <div className="barra-avanzamento">
            <div className="barra-avanzamento__riempimento" style={{ width: `${percentuale}%` }} />
          </div>
          <div className="player-compatto__tempi">
            <span>{formattaTempo(posizione)}</span>
            <span>{formattaResiduo(durata - posizione)}</span>
          </div>
        </div>
      </div>
      {onSalta && (
        <div className="player-compatto__salti">
          <button type="button" className="player-compatto__salto" onClick={() => onSalta(-15)}>
            −15 s
          </button>
          <button type="button" className="player-compatto__salto" onClick={() => onSalta(15)}>
            +15 s
          </button>
          {onTesto && (
            <button type="button" className="player-compatto__salto" onClick={onTesto}>
              Testo
            </button>
          )}
        </div>
      )}
    </div>
  )
}
