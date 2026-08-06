import type { ReactNode } from 'react'
import { IconaAttenzione, IconaChiudi, IconaInfo, IconaReteAssente } from './Icone'

type Peso = 'informativo' | 'attenzione' | 'bloccante'

type Proprieta = {
  peso: Peso
  titolo: string
  dettaglio?: string
  icona?: 'info' | 'attenzione' | 'rete'
  titoloSerif?: boolean
  istruzione?: string
  azioni?: ReactNode
  onChiudi?: () => void
}

const icone = {
  info: IconaInfo,
  attenzione: IconaAttenzione,
  rete: IconaReteAssente,
}

export function AvvisoDiSistema({
  peso,
  titolo,
  dettaglio,
  icona,
  titoloSerif = false,
  istruzione,
  azioni,
  onChiudi,
}: Proprieta) {
  const Icona = icona ? icone[icona] : null

  return (
    <div className={`avviso avviso--${peso}`}>
      {Icona && (
        <span className="avviso__icona">
          <Icona dimensione={20} colore="#23201d" />
        </span>
      )}
      <div className="avviso__testo">
        <div className={titoloSerif ? 'avviso__titolo avviso__titolo--serif' : 'avviso__titolo'}>
          {titolo}
        </div>
        {dettaglio && <div className="avviso__dettaglio">{dettaglio}</div>}
        {istruzione && <div className="avviso__istruzione">{istruzione}</div>}
      </div>
      {azioni && <div className="avviso__azioni">{azioni}</div>}
      {onChiudi && (
        <button type="button" className="avviso__chiudi" onClick={onChiudi} aria-label="Chiudi">
          <IconaChiudi colore="#23201d" />
        </button>
      )}
    </div>
  )
}
