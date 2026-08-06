import { Tacche } from './Tacche'

type Proprieta = {
  ombre: number
  onAggiungi: () => void
  onTogli: () => void
}

export function ContatoreBicchieri({ ombre, onAggiungi, onTogli }: Proprieta) {
  return (
    <div className="contatore">
      <div className="contatore__numero">{ombre}</div>
      <div>
        <Tacche quantita={ombre} />
        <div className="contatore__etichetta">tacche del libretto</div>
      </div>
      <div className="contatore__comandi">
        <button
          type="button"
          className="contatore__tasto"
          onClick={onAggiungi}
          aria-label="Segna un’ombra"
        >
          +
        </button>
        <button
          type="button"
          className="contatore__tasto contatore__tasto--meno"
          onClick={onTogli}
          disabled={ombre === 0}
          aria-label="Togli un’ombra"
        >
          −
        </button>
      </div>
    </div>
  )
}
