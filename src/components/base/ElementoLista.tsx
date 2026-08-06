import { IconaAvanti, IconaSpunta } from './Icone'

export type StatoTappa = 'da-fare' | 'attiva' | 'fatta'

type Proprieta = {
  numero: number
  titolo: string
  dettaglio: string
  stato: StatoTappa
  onApri?: () => void
}

export function ElementoLista({ numero, titolo, dettaglio, stato, onApri }: Proprieta) {
  const classi = ['elemento-lista']
  if (stato === 'attiva') classi.push('elemento-lista--attiva')
  if (stato === 'fatta') classi.push('elemento-lista--fatta')

  return (
    <button type="button" className={classi.join(' ')} onClick={onApri}>
      <span
        className={`elemento-lista__segno${
          stato === 'fatta'
            ? ' elemento-lista__segno--fatta'
            : stato === 'attiva'
              ? ' elemento-lista__segno--attiva'
              : ''
        }`}
      >
        {stato === 'fatta' ? <IconaSpunta dimensione={17} colore="#f5efe6" /> : numero}
      </span>
      <span className="elemento-lista__corpo">
        <span className="elemento-lista__titolo">{titolo}</span>
        <span className="elemento-lista__dettaglio">{dettaglio}</span>
      </span>
      {stato === 'attiva' && <IconaAvanti colore="#23201d" />}
    </button>
  )
}
