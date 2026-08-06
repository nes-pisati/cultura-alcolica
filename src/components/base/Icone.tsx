type ProprietaIcona = {
  dimensione?: number
  colore?: string
}

const contorno = (dimensione: number, colore: string, spessore = 2) => ({
  width: dimensione,
  height: dimensione,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: colore,
  strokeWidth: spessore,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
  'aria-hidden': true,
})

const pieno = (dimensione: number, colore: string) => ({
  width: dimensione,
  height: dimensione,
  viewBox: '0 0 24 24',
  fill: colore,
  'aria-hidden': true,
})

export function IconaBicchiere({ dimensione = 20, colore = 'currentColor' }: ProprietaIcona) {
  return (
    <svg {...pieno(dimensione, colore)}>
      <path d="M6 3h12l-1 6a5 5 0 0 1-4 4v6h3v2H8v-2h3v-6a5 5 0 0 1-4-4L6 3z" />
    </svg>
  )
}

export function IconaEdificio({ dimensione = 20, colore = 'currentColor' }: ProprietaIcona) {
  return (
    <svg {...contorno(dimensione, colore, 2.4)}>
      <path d="M4 20h16M6 20V9l6-4 6 4v11M10 20v-6h4v6" />
    </svg>
  )
}

export function IconaPlay({ dimensione = 22, colore = 'currentColor' }: ProprietaIcona) {
  return (
    <svg {...pieno(dimensione, colore)}>
      <path d="M8 5l12 7-12 7z" />
    </svg>
  )
}

export function IconaPausa({ dimensione = 22, colore = 'currentColor' }: ProprietaIcona) {
  return (
    <svg {...pieno(dimensione, colore)}>
      <rect x="7" y="4" width="4" height="16" />
      <rect x="14" y="4" width="4" height="16" />
    </svg>
  )
}

export function IconaMirino({ dimensione = 24, colore = 'currentColor' }: ProprietaIcona) {
  return (
    <svg {...contorno(dimensione, colore)}>
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v3M12 19v3M2 12h3M19 12h3" />
    </svg>
  )
}

export function IconaSpunta({ dimensione = 18, colore = 'currentColor' }: ProprietaIcona) {
  return (
    <svg {...contorno(dimensione, colore, 2.6)}>
      <path d="M5 13l5 5 9-11" />
    </svg>
  )
}

export function IconaIndietro({ dimensione = 20, colore = 'currentColor' }: ProprietaIcona) {
  return (
    <svg {...contorno(dimensione, colore, 2.2)}>
      <path d="M15 5l-7 7 7 7" />
    </svg>
  )
}

export function IconaGiu({ dimensione = 20, colore = 'currentColor' }: ProprietaIcona) {
  return (
    <svg {...contorno(dimensione, colore, 2.2)}>
      <path d="M6 15l6-6 6 6" />
    </svg>
  )
}

export function IconaAvanti({ dimensione = 20, colore = 'currentColor' }: ProprietaIcona) {
  return (
    <svg {...contorno(dimensione, colore, 2.2)}>
      <path d="M9 5l7 7-7 7" />
    </svg>
  )
}

export function IconaAttenzione({ dimensione = 18, colore = 'currentColor' }: ProprietaIcona) {
  return (
    <svg {...contorno(dimensione, colore, 2.2)}>
      <path d="M12 4l9 16H3z" />
      <path d="M12 10v4M12 17h.01" />
    </svg>
  )
}

export function IconaInfo({ dimensione = 20, colore = 'currentColor' }: ProprietaIcona) {
  return (
    <svg {...contorno(dimensione, colore, 2.2)}>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 8h.01M12 11v5" />
    </svg>
  )
}

export function IconaRete({ dimensione = 16, colore = 'currentColor' }: ProprietaIcona) {
  return (
    <svg {...contorno(dimensione, colore, 2.2)}>
      <path d="M4 9a12 12 0 0 1 16 0M7 13a8 8 0 0 1 10 0M10.5 16.5a3 3 0 0 1 3 0" />
      <path d="M12 20h.01" />
    </svg>
  )
}

export function IconaReteAssente({ dimensione = 20, colore = 'currentColor' }: ProprietaIcona) {
  return (
    <svg {...contorno(dimensione, colore, 2.2)}>
      <path d="M4 9a12 12 0 0 1 16 0" />
      <path d="M8 13a7 7 0 0 1 8 0" />
      <path d="M12 19h.01" />
      <path d="M3 3l18 18" />
    </svg>
  )
}

export function IconaCondividi({ dimensione = 20, colore = 'currentColor' }: ProprietaIcona) {
  return (
    <svg {...contorno(dimensione, colore)}>
      <path d="M12 3v11M8 7l4-4 4 4" />
      <path d="M5 14v6h14v-6" />
    </svg>
  )
}

export function IconaAggiungi({ dimensione = 20, colore = 'currentColor' }: ProprietaIcona) {
  return (
    <svg {...contorno(dimensione, colore)}>
      <rect x="4" y="4" width="16" height="16" rx="3" />
      <path d="M12 9v6M9 12h6" />
    </svg>
  )
}

export function IconaMappa({ dimensione = 18, colore = 'currentColor' }: ProprietaIcona) {
  return (
    <svg {...contorno(dimensione, colore)}>
      <path d="M4 6l5-2 6 2 5-2v14l-5 2-6-2-5 2z" />
      <path d="M9 4v14M15 6v14" />
    </svg>
  )
}

export function IconaOnde({ dimensione = 18, colore = 'currentColor' }: ProprietaIcona) {
  return (
    <svg {...contorno(dimensione, colore)}>
      <path d="M4 10v4M8 6v12M12 8v8M16 5v14M20 10v4" />
    </svg>
  )
}

export function IconaDocumento({ dimensione = 18, colore = 'currentColor' }: ProprietaIcona) {
  return (
    <svg {...contorno(dimensione, colore)}>
      <path d="M6 3h9l4 4v14H6z" />
      <path d="M9 12h7M9 16h7" />
    </svg>
  )
}

export function IconaSchermo({ dimensione = 18, colore = 'currentColor' }: ProprietaIcona) {
  return (
    <svg {...contorno(dimensione, colore, 2.2)}>
      <rect x="6" y="3" width="12" height="18" rx="2.5" />
      <path d="M12 7v5" />
    </svg>
  )
}

export function IconaIndietro15({ dimensione = 24, colore = 'currentColor' }: ProprietaIcona) {
  return (
    <svg {...contorno(dimensione, colore)}>
      <path d="M11 5L4 12l7 7" />
      <path d="M20 12H5" />
    </svg>
  )
}

export function IconaAvanti15({ dimensione = 24, colore = 'currentColor' }: ProprietaIcona) {
  return (
    <svg {...contorno(dimensione, colore)}>
      <path d="M13 5l7 7-7 7" />
      <path d="M4 12h15" />
    </svg>
  )
}

export function IconaChiudi({ dimensione = 16, colore = 'currentColor' }: ProprietaIcona) {
  return (
    <svg {...contorno(dimensione, colore, 2.4)}>
      <path d="M6 6l12 12M18 6L6 18" />
    </svg>
  )
}
