import { TAPPE } from '../../dati/tappe'
import type { Ombra } from '../../stato/useTour'
import { formattaDistanza } from '../../utilita/formato'
import { ElementoLista } from '../base/ElementoLista'
import { IconaGiu } from '../base/Icone'
import { PulsanteGrande, PulsanteTondo } from '../base/Pulsanti'

type Proprieta = {
  indiceAttiva: number
  completate: number[]
  ombre: Ombra[]
  metriRimanenti: number
  onChiudi: () => void
  onApriTappa: (id: number) => void
}

const tipoLeggibile = (tipo: string) => (tipo === 'bacaro' ? 'Bacaro' : 'Culturale')

export function ElencoTappe({
  indiceAttiva,
  completate,
  ombre,
  metriRimanenti,
  onChiudi,
  onApriTappa,
}: Proprieta) {
  return (
    <div className="schermata">
      <div className="schermata__testata">
        <PulsanteTondo onClick={onChiudi} aria-label="Torna alla mappa">
          <IconaGiu colore="#23201d" />
        </PulsanteTondo>
        <div className="elenco__testata-corpo">
          <span className="elenco__titolo">Il percorso</span>
          <span className="elenco__sottotitolo">
            {`${completate.length} di ${TAPPE.length} fatte · restano ${formattaDistanza(
              metriRimanenti,
            )}`}
          </span>
        </div>
      </div>

      <div className="elenco__lista">
        {TAPPE.map((tappa, indice) => {
          const fatta = completate.includes(tappa.id)
          const ombreSegnate = ombre.filter((ombra) => ombra.tappaId === tappa.id).length
          const dettagli = [
            tipoLeggibile(tappa.tipo),
            indice === 0 ? 'partenza' : formattaDistanza(tappa.distanzaDallaPrecedente),
            indice === indiceAttiva ? 'attiva ora' : null,
            ombreSegnate > 0 ? `${ombreSegnate} ombre segnate` : null,
          ].filter(Boolean)

          return (
            <ElementoLista
              key={tappa.id}
              numero={tappa.id}
              titolo={tappa.titolo}
              dettaglio={dettagli.join(' · ')}
              stato={fatta ? 'fatta' : indice === indiceAttiva ? 'attiva' : 'da-fare'}
              onApri={() => onApriTappa(tappa.id)}
            />
          )
        })}
      </div>

      <div className="elenco__piede">
        <PulsanteGrande onClick={onChiudi}>Torna alla mappa</PulsanteGrande>
      </div>
    </div>
  )
}
