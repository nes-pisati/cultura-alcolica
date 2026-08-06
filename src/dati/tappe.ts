export type TipoTappa = 'culturale' | 'bacaro'

export type Ordinazione = {
  nome: string
  prezzo: string
}

export type Tappa = {
  id: number
  titolo: string
  tipo: TipoTappa
  coordinate: [number, number]
  distanzaDallaPrecedente: number
  durataAudio: number
  paragrafi: string[]
  ordinazioni?: Ordinazione[]
}

const paragrafiSegnaposto = [
  'Testo narrativo della tappa, segnaposto. Il registro è quello di una guida stampata: frasi piene, nessun elenco puntato, nessun grassetto sparso.',
  'Secondo paragrafo, che continua a scorrere sotto il player ancorato in basso. La colonna resta a 17 px anche al sole.',
  'Terzo paragrafo, che continua sotto il bordo dello schermo. Lo scorrimento è verticale e non c’è nulla che si possa toccare per sbaglio nel mezzo del testo.',
]

const ordinazioniSegnaposto: Ordinazione[] = [
  { nome: 'Un’ombra di rosso', prezzo: '1,50 €' },
  { nome: 'Cicchetto segnaposto', prezzo: '2,00 €' },
]

export const TAPPE: Tappa[] = [
  {
    id: 1,
    titolo: 'Tappa 1 — segnaposto',
    tipo: 'culturale',
    coordinate: [12.3266, 45.4441],
    distanzaDallaPrecedente: 0,
    durataAudio: 190,
    paragrafi: paragrafiSegnaposto,
  },
  {
    id: 2,
    titolo: 'Tappa 2 — segnaposto',
    tipo: 'bacaro',
    coordinate: [12.3288, 45.4433],
    distanzaDallaPrecedente: 320,
    durataAudio: 200,
    paragrafi: paragrafiSegnaposto,
    ordinazioni: ordinazioniSegnaposto,
  },
  {
    id: 3,
    titolo: 'Tappa 3 — segnaposto',
    tipo: 'culturale',
    coordinate: [12.3305, 45.4424],
    distanzaDallaPrecedente: 240,
    durataAudio: 230,
    paragrafi: paragrafiSegnaposto,
  },
  {
    id: 4,
    titolo: 'Tappa 4 — segnaposto',
    tipo: 'bacaro',
    coordinate: [12.3319, 45.4416],
    distanzaDallaPrecedente: 180,
    durataAudio: 200,
    paragrafi: paragrafiSegnaposto,
    ordinazioni: ordinazioniSegnaposto,
  },
  {
    id: 5,
    titolo: 'Tappa 5 — segnaposto',
    tipo: 'culturale',
    coordinate: [12.333, 45.4408],
    distanzaDallaPrecedente: 180,
    durataAudio: 250,
    paragrafi: paragrafiSegnaposto,
  },
  {
    id: 6,
    titolo: 'Tappa 6 — segnaposto',
    tipo: 'bacaro',
    coordinate: [12.3352, 45.4401],
    distanzaDallaPrecedente: 410,
    durataAudio: 210,
    paragrafi: paragrafiSegnaposto,
    ordinazioni: ordinazioniSegnaposto,
  },
  {
    id: 7,
    titolo: 'Tappa 7 — segnaposto',
    tipo: 'culturale',
    coordinate: [12.3364, 45.4396],
    distanzaDallaPrecedente: 150,
    durataAudio: 240,
    paragrafi: paragrafiSegnaposto,
  },
  {
    id: 8,
    titolo: 'Tappa 8 — segnaposto',
    tipo: 'bacaro',
    coordinate: [12.3379, 45.4392],
    distanzaDallaPrecedente: 260,
    durataAudio: 195,
    paragrafi: paragrafiSegnaposto,
    ordinazioni: ordinazioniSegnaposto,
  },
  {
    id: 9,
    titolo: 'Tappa 9 — segnaposto',
    tipo: 'culturale',
    coordinate: [12.3391, 45.4386],
    distanzaDallaPrecedente: 300,
    durataAudio: 260,
    paragrafi: paragrafiSegnaposto,
  },
  {
    id: 10,
    titolo: 'Tappa 10 — segnaposto',
    tipo: 'bacaro',
    coordinate: [12.3378, 45.4379],
    distanzaDallaPrecedente: 220,
    durataAudio: 205,
    paragrafi: paragrafiSegnaposto,
    ordinazioni: ordinazioniSegnaposto,
  },
  {
    id: 11,
    titolo: 'Tappa 11 — nome molto lungo che occupa due righe e poi si interrompe',
    tipo: 'culturale',
    coordinate: [12.3366, 45.4376],
    distanzaDallaPrecedente: 190,
    durataAudio: 235,
    paragrafi: paragrafiSegnaposto,
  },
  {
    id: 12,
    titolo: 'Tappa 12 — segnaposto',
    tipo: 'culturale',
    coordinate: [12.3355, 45.438],
    distanzaDallaPrecedente: 350,
    durataAudio: 220,
    paragrafi: paragrafiSegnaposto,
  },
]

export const PERCORSO: [number, number][] = [
  [12.3266, 45.4441],
  [12.3276, 45.4438],
  [12.3288, 45.4433],
  [12.3297, 45.4428],
  [12.3305, 45.4424],
  [12.3312, 45.442],
  [12.3319, 45.4416],
  [12.3325, 45.4412],
  [12.333, 45.4408],
  [12.3342, 45.4404],
  [12.3352, 45.4401],
  [12.3358, 45.4398],
  [12.3364, 45.4396],
  [12.3372, 45.4394],
  [12.3379, 45.4392],
  [12.3386, 45.4389],
  [12.3391, 45.4386],
  [12.3385, 45.4382],
  [12.3378, 45.4379],
  [12.3372, 45.4377],
  [12.3366, 45.4376],
  [12.336, 45.4378],
  [12.3355, 45.438],
]

export const NUMERI_TOUR = {
  tappe: TAPPE.length,
  bacari: TAPPE.filter((tappa) => tappa.tipo === 'bacaro').length,
  distanza: '3,4 km',
  durata: '2h 40m',
}

export const PESI_DOWNLOAD = {
  mappa: 3.7,
  audio: 18,
  testi: 0.2,
}
