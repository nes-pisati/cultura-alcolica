type Proprieta = {
  raggioPixel: number
  imprecisa: boolean
  direzione?: number | null
}

const CONO = 'M0 0 L-15 -27 A 30 30 0 0 1 15 -27 Z'

export function IndicatorePosizione({ raggioPixel, imprecisa, direzione }: Proprieta) {
  const raggio = Math.max(raggioPixel, 18)
  const lato = raggio * 2 + 24
  const centro = lato / 2

  return (
    <svg className="indicatore-posizione" width={lato} height={lato} aria-hidden="true">
      <circle
        cx={centro}
        cy={centro}
        r={raggio}
        fill={imprecisa ? '#d98b1f' : '#7b1f2b'}
        opacity={imprecisa ? 0.16 : 0.1}
      />
      <circle
        cx={centro}
        cy={centro}
        r={raggio}
        fill="none"
        stroke={imprecisa ? '#8a5f12' : '#7b1f2b'}
        strokeWidth="1.5"
        strokeDasharray={imprecisa ? '4 5' : undefined}
        opacity={imprecisa ? 1 : 0.35}
      />
      {!imprecisa && direzione !== null && direzione !== undefined && (
        <path
          d={CONO}
          fill="#7b1f2b"
          opacity="0.22"
          transform={`translate(${centro} ${centro}) rotate(${direzione})`}
        />
      )}
      <circle
        cx={centro}
        cy={centro}
        r="9"
        fill={imprecisa ? '#8a5f12' : '#7b1f2b'}
        stroke="#f5efe6"
        strokeWidth="3"
      />
    </svg>
  )
}
