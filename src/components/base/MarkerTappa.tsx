import type { StatoTappa } from './ElementoLista'

type Proprieta = {
  numero: number
  stato: StatoTappa
  onApri?: () => void
}

export function MarkerTappa({ numero, stato, onApri }: Proprieta) {
  return (
    <button
      type="button"
      className="marker-tappa"
      onClick={onApri}
      aria-label={`Tappa ${numero}`}
      aria-current={stato === 'attiva' ? 'step' : undefined}
    >
      <svg width="56" height="56" viewBox="0 0 56 56" aria-hidden="true">
        {stato === 'attiva' && (
          <>
            <circle cx="28" cy="28" r="26" fill="#b98a2a" opacity="0.22" />
            <circle cx="28" cy="28" r="18" fill="#b98a2a" stroke="#23201d" strokeWidth="2.5" />
            <text
              x="28"
              y="34"
              textAnchor="middle"
              fill="#23201d"
              fontFamily="'IBM Plex Sans', system-ui, sans-serif"
              fontWeight="600"
              fontSize="16"
            >
              {numero}
            </text>
          </>
        )}
        {stato === 'fatta' && (
          <>
            <circle cx="28" cy="28" r="15" fill="#7b1f2b" />
            <path
              d="M21 28 l5 5 l9 -10"
              stroke="#f5efe6"
              strokeWidth="2.4"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </>
        )}
        {stato === 'da-fare' && (
          <>
            <circle cx="28" cy="28" r="15" fill="#f5efe6" stroke="#7b1f2b" strokeWidth="2.5" />
            <text
              x="28"
              y="34"
              textAnchor="middle"
              fill="#7b1f2b"
              fontFamily="'IBM Plex Sans', system-ui, sans-serif"
              fontWeight="600"
              fontSize="15"
            >
              {numero}
            </text>
          </>
        )}
      </svg>
    </button>
  )
}
