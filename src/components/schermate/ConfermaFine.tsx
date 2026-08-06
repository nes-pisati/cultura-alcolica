import { PESI_DOWNLOAD } from '../../dati/tappe'
import { formattaMegabyte } from '../../utilita/formato'
import { PulsanteGrande, PulsantePillola } from '../base/Pulsanti'

type Proprieta = {
  ombre: number
  tappeFatte: number
  totaleTappe: number
  onConferma: () => void
  onAnnulla: () => void
}

const PESO_TOTALE = PESI_DOWNLOAD.mappa + PESI_DOWNLOAD.audio + PESI_DOWNLOAD.testi

export function ConfermaFine({
  ombre,
  tappeFatte,
  totaleTappe,
  onConferma,
  onAnnulla,
}: Proprieta) {
  return (
    <>
      <div className="velo-modale" />
      <div className="sheet sheet--conferma">
        <div className="sovratitolo sovratitolo--piccolo">Fine del giro</div>
        <h2 className="titolo-tappa sheet__titolo">Vuoi terminare il tour?</h2>
        <p className="conferma__testo">
          {`Hai fatto ${tappeFatte} tappe di ${totaleTappe} e segnato ${ombre} ombre. Chiudendo qui si cancellano l’avanzamento salvato sul telefono e i ${formattaMegabyte(
            PESO_TOTALE,
          )} scaricati per l’offline: mappa e audioguide. Per rifare il giro andranno scaricati di nuovo.`}
        </p>
        <div className="sheet__azioni sheet__azioni--colonna">
          <PulsanteGrande onClick={onConferma}>Termina e libera lo spazio</PulsanteGrande>
          <PulsantePillola neutro largo onClick={onAnnulla}>
            Continua il tour
          </PulsantePillola>
        </div>
      </div>
    </>
  )
}
