import { NUMERI_TOUR, TAPPE, type Tappa } from '../../dati/tappe'
import { IconaPlay, IconaSchermo } from '../base/Icone'

type Proprieta = {
  onInizia: () => void
  ripresa?: boolean
  tappaRipresa?: Tappa
}

export function IniziaTour({ onInizia, ripresa = false, tappaRipresa }: Proprieta) {
  const tappa = ripresa && tappaRipresa ? tappaRipresa : TAPPE[0]

  return (
    <div className="schermata schermata--vino">
      <div className="inizia">
        <div className="sovratitolo inizia__sovratitolo">
          {ripresa
            ? `Tour ripreso · tappa ${tappa.id} di ${NUMERI_TOUR.tappe}`
            : `Tutto scaricato · ${NUMERI_TOUR.tappe} tappe pronte`}
        </div>
        <h1 className="inizia__titolo">
          {ripresa ? 'Riprendi da' : 'Si parte da'}
          <br />
          {tappa.titolo.split(' — ')[0]}
        </h1>
        <p className="inizia__testo">
          Tocca il pulsante: da qui in poi l’audioguida può parlare da sola.
        </p>
        <button type="button" className="inizia__pulsante" onClick={onInizia}>
          <IconaPlay dimensione={52} colore="#7b1f2b" />
          <span>{ripresa ? 'Riprendi il tour' : 'Inizia il tour'}</span>
        </button>
      </div>
      <div className="inizia__piede">
        <IconaSchermo colore="#e0b552" />
        <span>Tieni lo schermo acceso e l’app aperta: solo così il telefono sa dove sei.</span>
      </div>
    </div>
  )
}
