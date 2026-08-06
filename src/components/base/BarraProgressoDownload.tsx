import { formattaMegabyte } from '../../utilita/formato'
import { IconaSpunta } from './Icone'

export type StatoVoce = 'attesa' | 'corso' | 'salvata' | 'interrotta'

type Proprieta = {
  nome: string
  scaricati: number
  totale: number
  stato: StatoVoce
  nota?: string
}

const etichetta = (stato: StatoVoce, scaricati: number, totale: number) => {
  if (stato === 'salvata') return `${formattaMegabyte(totale)} · salvata`
  if (stato === 'attesa') return 'in attesa'
  if (stato === 'interrotta') return 'interrotto'
  return `${formattaMegabyte(scaricati)} / ${formattaMegabyte(totale)}`
}

export function BarraProgressoDownload({ nome, scaricati, totale, stato, nota }: Proprieta) {
  const percentuale = totale === 0 ? 0 : Math.min((scaricati / totale) * 100, 100)

  return (
    <div>
      <div className="voce-download__intestazione">
        <span className="voce-download__nome">
          {stato === 'salvata' && <IconaSpunta dimensione={15} colore="#7b1f2b" />}
          {nome}
        </span>
        <span className="voce-download__peso">{etichetta(stato, scaricati, totale)}</span>
      </div>
      {stato === 'salvata' ? (
        <div className="barra-download barra-download--completa" />
      ) : (
        <div className="barra-download">
          <div
            className={`barra-download__riempimento${
              stato === 'interrotta' ? ' barra-download__riempimento--interrotto' : ''
            }`}
            style={{ width: `${percentuale}%` }}
          />
        </div>
      )}
      {nota && <div className="voce-download__nota">{nota}</div>}
    </div>
  )
}
