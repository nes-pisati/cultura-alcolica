import type { TipoTappa } from '../../dati/tappe'
import { IconaBicchiere, IconaEdificio } from './Icone'

export function BadgeTipo({ tipo }: { tipo: TipoTappa }) {
  return (
    <span className="badge">
      {tipo === 'bacaro' ? (
        <IconaBicchiere dimensione={11} colore="#23201d" />
      ) : (
        <IconaEdificio dimensione={11} colore="#23201d" />
      )}
      {tipo === 'bacaro' ? 'Bacaro' : 'Culturale'}
    </span>
  )
}

export function BadgeAttiva() {
  return <span className="badge badge--attiva">Attiva ora</span>
}

export function BadgeInAscolto() {
  return <span className="badge badge--attiva">In ascolto</span>
}

export function BadgeFatta() {
  return <span className="badge badge--fatta">Fatta</span>
}
