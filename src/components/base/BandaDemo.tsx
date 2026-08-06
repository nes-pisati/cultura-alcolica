export function BandaDemo({ onEsci }: { onEsci: () => void }) {
  return (
    <div className="banda-demo">
      <span className="banda-demo__etichetta">Modalità demo · posizione simulata</span>
      <button type="button" className="banda-demo__uscita" onClick={onEsci}>
        Esci
      </button>
    </div>
  )
}
