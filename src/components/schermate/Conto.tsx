import { TAPPE } from '../../dati/tappe'
import type { Ombra } from '../../stato/useTour'
import { IconaBicchiere, IconaGiu } from '../base/Icone'
import { PulsanteGrande, PulsanteTondo } from '../base/Pulsanti'
import { Tacche } from '../base/Tacche'

type Proprieta = {
  ombre: Ombra[]
  inizio: string | null
  onChiudi: () => void
  onAggiungi: () => void
  onTogli: () => void
}

const titoloTappa = (id: number) => TAPPE.find((tappa) => tappa.id === id)?.titolo ?? ''

export function Conto({ ombre, inizio, onChiudi, onAggiungi, onTogli }: Proprieta) {
  return (
    <div className="schermata">
      <div className="schermata__testata schermata__testata--nuda">
        <PulsanteTondo onClick={onChiudi} aria-label="Chiudi il conto">
          <IconaGiu colore="#23201d" />
        </PulsanteTondo>
        <span className="sovratitolo sovratitolo--piccolo schermata__testata-centro">
          Il conto della serata
        </span>
        <span className="schermata__testata-spazio" />
      </div>

      <div className="conto__corpo">
        <div className="conto__riepilogo">
          <div className="contatore__numero contatore__numero--grande">{ombre.length}</div>
          <div>
            <div className="conto__etichetta">
              {inizio ? `ombre dalle ${inizio}` : 'ombre di questa serata'}
            </div>
            <Tacche quantita={ombre.length} altezza="alta" />
          </div>
        </div>

        <div className="sovratitolo sovratitolo--piccolo">Registro</div>
        {ombre.length === 0 ? (
          <p className="conto__vuoto">Ancora nessuna ombra segnata.</p>
        ) : (
          <div>
            {ombre.map((ombra, indice) => (
              <div className="conto__registro-riga" key={`${ombra.ora}-${indice}`}>
                <span className="conto__ora">{ombra.ora}</span>
                <span className="conto__tappa">{titoloTappa(ombra.tappaId)}</span>
                <span className="tacca tacca--bassa" />
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="conto__comandi">
        <PulsanteGrande className="conto__aggiungi" onClick={onAggiungi}>
          <IconaBicchiere dimensione={22} colore="#f5efe6" />+ un’ombra
        </PulsanteGrande>
        <button
          type="button"
          className="conto__correggi"
          onClick={onTogli}
          disabled={ombre.length === 0}
        >
          <span>−</span>
          <span className="conto__correggi-nota">correggi</span>
        </button>
      </div>
    </div>
  )
}
