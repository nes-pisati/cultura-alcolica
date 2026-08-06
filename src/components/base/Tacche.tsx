type Altezza = 'alta' | 'media' | 'bassa' | 'normale'

const classePerAltezza: Record<Altezza, string> = {
  alta: 'tacca tacca--alta',
  media: 'tacca tacca--media',
  bassa: 'tacca tacca--bassa',
  normale: 'tacca',
}

export function Tacche({ quantita, altezza = 'normale' }: { quantita: number; altezza?: Altezza }) {
  return (
    <div className="contatore__tacche">
      {Array.from({ length: quantita }, (_, indice) => (
        <span key={indice} className={classePerAltezza[altezza]} />
      ))}
    </div>
  )
}
