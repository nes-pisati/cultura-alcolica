import { NUMERI_TOUR } from '../../dati/tappe'
import { IconaBicchiere, IconaSpunta } from '../base/Icone'
import { PulsanteGrande } from '../base/Pulsanti'

const voci = [
  { nome: 'Tappe', valore: `${NUMERI_TOUR.tappe}` },
  { nome: 'A piedi', valore: NUMERI_TOUR.distanza },
  { nome: 'Durata', valore: NUMERI_TOUR.durata },
  { nome: 'Bacari', valore: `${NUMERI_TOUR.bacari}` },
]

export function Benvenuto({ onAvanti }: { onAvanti: () => void }) {
  return (
    <div className="schermata">
      <div className="schermata__corpo benvenuto">
        <div className="benvenuto__marchio">
          <IconaBicchiere dimensione={26} colore="#f5efe6" />
        </div>
        <div className="sovratitolo">Bacaro Tour Venezia</div>
        <h1 className="titolo-schermata titolo-schermata--largo">Un giro di bacari, a piedi</h1>
        <p className="testo-guida">
          Un percorso solo, dall’inizio alla fine. L’audioguida parte quando arrivi. Le ombre le
          conti tu.
        </p>
        <div className="benvenuto__indice">
          {voci.map((voce) => (
            <div className="riga-indice" key={voce.nome}>
              <span className="riga-indice__voce">{voce.nome}</span>
              <span className="riga-indice__punti" />
              <span className="riga-indice__valore">{voce.valore}</span>
            </div>
          ))}
        </div>
        <div className="schermata__piede">
          <div className="nota-piede">
            <IconaSpunta dimensione={16} colore="#6b645c" />
            Funziona anche senza rete
          </div>
          <PulsanteGrande onClick={onAvanti}>Comincia</PulsanteGrande>
          <div className="passi">
            <span className="passi__segno passi__segno--attivo" />
            <span className="passi__segno" />
            <span className="passi__segno" />
            <span className="passi__segno" />
          </div>
        </div>
      </div>
    </div>
  )
}
