import { execFileSync } from 'node:child_process'
import { createHash } from 'node:crypto'
import { existsSync, mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'
import { TAPPE } from '../src/dati/tappe.ts'

const VOCE = process.env.VOCE ?? 'Alice'
const CARTELLA = 'public/audio'
const MANIFEST = join(CARTELLA, 'manifest.json')
const DURATE = 'src/dati/durate.ts'

type AudioGenerato = {
  impronta: string
  durata: number
}

type Manifest = Record<string, AudioGenerato>

const percorsoAudio = (id: number) => join(CARTELLA, `tappa-${id}.m4a`)

const improntaDi = (testo: string) =>
  createHash('sha256').update(`${VOCE}\n${testo}`).digest('hex').slice(0, 16)

const leggiManifest = (): Manifest =>
  existsSync(MANIFEST) ? JSON.parse(readFileSync(MANIFEST, 'utf8')) : {}

const durataDi = (percorso: string) => {
  const uscita = execFileSync('afinfo', [percorso], { encoding: 'utf8' })
  const trovata = uscita.match(/estimated duration: ([\d.]+)/)
  return trovata ? Math.round(Number(trovata[1])) : 0
}

const genera = (id: number, testo: string) => {
  const grezzo = join(CARTELLA, `tappa-${id}.aiff`)
  const finale = percorsoAudio(id)
  execFileSync('say', ['-v', VOCE, '-o', grezzo, testo])
  execFileSync('afconvert', ['-f', 'm4af', '-d', 'aac', '-b', '64000', '-c', '1', grezzo, finale])
  rmSync(grezzo)
  return durataDi(finale)
}

mkdirSync(CARTELLA, { recursive: true })

const manifest = leggiManifest()
let generate = 0
let saltate = 0

for (const tappa of TAPPE) {
  const testo = tappa.paragrafi?.join('\n\n')
  if (!testo) continue

  const impronta = improntaDi(testo)
  const gia = manifest[tappa.id]
  if (gia?.impronta === impronta && existsSync(percorsoAudio(tappa.id))) {
    saltate += 1
    continue
  }

  const durata = genera(tappa.id, testo)
  manifest[tappa.id] = { impronta, durata }
  generate += 1
  console.log(`generata tappa-${tappa.id}.m4a · ${durata}s · ${tappa.titolo}`)
}

writeFileSync(MANIFEST, `${JSON.stringify(manifest, null, 2)}\n`)

const righe = Object.entries(manifest)
  .sort(([primo], [secondo]) => Number(primo) - Number(secondo))
  .map(([id, audio]) => `  ${id}: ${audio.durata},`)

writeFileSync(
  DURATE,
  `export const DURATE_AUDIO: Record<number, number> = {\n${righe.join('\n')}\n}\n`,
)

console.log(`\nvoce: ${VOCE} · generate: ${generate} · invariate: ${saltate}`)
