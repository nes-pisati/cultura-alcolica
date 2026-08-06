import { NUMERI_TOUR } from '../../dati/tappe'
import { PulsanteGrande, PulsantePillola } from '../base/Pulsanti'
import { Tacche } from '../base/Tacche'

type Proprieta = {
  tappeFatte: number
  ombre: number
  durata: string
  onRivedi: () => void
  onAzzera: () => void
}

export function TourCompletato({ tappeFatte, ombre, durata, onRivedi, onAzzera }: Proprieta) {
  const oggi = new Date().toLocaleDateString('it-IT', { day: 'numeric', month: 'long' })

  return (
    <div className="schermata">
      <div className="schermata__corpo">
        <div className="sovratitolo">{`Tour concluso · ${oggi}`}</div>
        <h1 className="titolo-schermata titolo-schermata--largo">
          Dodici tappe,
          <br />
          tutte fatte
        </h1>
        <div className="fine__riepilogo">
          <div className="riga-indice fine__riga">
            <span className="riga-indice__voce">Tappe</span>
            <span className="riga-indice__punti" />
            <span className="riga-indice__valore">{tappeFatte}</span>
          </div>
          <div className="riga-indice fine__riga">
            <span className="riga-indice__voce">A piedi</span>
            <span className="riga-indice__punti" />
            <span className="riga-indice__valore">{NUMERI_TOUR.distanza}</span>
          </div>
          <div className="riga-indice fine__riga">
            <span className="riga-indice__voce">Durata</span>
            <span className="riga-indice__punti" />
            <span className="riga-indice__valore">{durata}</span>
          </div>
          <div className="riga-indice fine__riga">
            <span className="riga-indice__voce">Ombre</span>
            <span className="riga-indice__punti" />
            <span className="fine__ombre">
              <Tacche quantita={ombre} altezza="media" />
              <span className="riga-indice__valore">{ombre}</span>
            </span>
          </div>
        </div>
        <p className="fine__nota">
          Il conto delle ombre non è mai uscito dal telefono. Ora è cancellato, insieme a mappa e
          audio scaricati: se domani vuoi rifare il giro, si riparte dal download.
        </p>
        <div className="schermata__piede">
          <div className="fine__azioni">
            <PulsanteGrande onClick={onRivedi}>Rivedi il percorso</PulsanteGrande>
            <PulsantePillola neutro largo onClick={onAzzera}>
              Torna all’inizio
            </PulsantePillola>
          </div>
        </div>
      </div>
    </div>
  )
}
