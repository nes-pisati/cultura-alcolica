import { PulsantePillola } from './Pulsanti'

export function BarraTermina({ onTermina }: { onTermina: () => void }) {
  return (
    <div className="barra-termina">
      <PulsantePillola neutro className="barra-termina__pulsante" onClick={onTermina}>
        Termina tour
      </PulsantePillola>
    </div>
  )
}
