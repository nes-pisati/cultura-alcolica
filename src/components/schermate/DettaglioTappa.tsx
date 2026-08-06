import type { Tappa } from '../../dati/tappe'
import { formattaDistanza, formattaResiduo, formattaTempo } from '../../utilita/formato'
import { BadgeTipo } from '../base/Badge'
import { IconaBicchiere, IconaIndietro, IconaPausa, IconaPlay } from '../base/Icone'
import { PulsanteGrande, PulsanteTondo } from '../base/Pulsanti'

type Proprieta = {
  tappa: Tappa
  numeroTappa: number
  totaleTappe: number
  prossima?: Tappa
  inRiproduzione: boolean
  posizione: number
  durata: number
  onIndietro: () => void
  onAlterna: () => void
  onSalta: (secondi: number) => void
  onOmbra: () => void
  onApriPlayer: () => void
}

export function DettaglioTappa({
  tappa,
  numeroTappa,
  totaleTappe,
  prossima,
  inRiproduzione,
  posizione,
  durata,
  onIndietro,
  onAlterna,
  onSalta,
  onOmbra,
  onApriPlayer,
}: Proprieta) {
  const durataAudio = durata
  const haAudio = durataAudio > 0
  const percentuale = haAudio ? Math.min((posizione / durataAudio) * 100, 100) : 0
  const bacaro = tappa.tipo === 'bacaro'

  return (
    <div className="schermata">
      <div className="schermata__testata">
        <PulsanteTondo onClick={onIndietro} aria-label="Torna alla mappa">
          <IconaIndietro colore="#23201d" />
        </PulsanteTondo>
        <span className="sovratitolo sovratitolo--piccolo">
          {`Tappa ${numeroTappa} di ${totaleTappe}`}
        </span>
        <span className="schermata__testata-coda">
          <BadgeTipo tipo={tappa.tipo} />
        </span>
      </div>

      <div className="dettaglio__contenuto">
        <h1 className="dettaglio__titolo">{tappa.titolo}</h1>
        {!bacaro && (
          <div className="dettaglio__sommario">
            {`Ascolto ${formattaTempo(durataAudio)} · ${formattaDistanza(
              tappa.distanzaDallaPrecedente,
            )} dalla tappa precedente`}
          </div>
        )}
        {bacaro && (
          <div className="dettaglio__immagine">
            <span className="dettaglio__segnaposto">foto del bancone · 4:3</span>
          </div>
        )}
        {tappa.descrizione && <p className="testo-narrativo">{tappa.descrizione}</p>}
        {tappa.paragrafi?.map((paragrafo, indice) => (
          <p
            key={indice}
            className={
              !bacaro && indice === 0 ? 'testo-narrativo dettaglio__capolettera' : 'testo-narrativo'
            }
          >
            {paragrafo}
          </p>
        ))}
        {tappa.ordinazioni && (
          <div className="ordini">
            <div className="sovratitolo sovratitolo--piccolo">Cosa ordinare</div>
            {tappa.ordinazioni.map((ordinazione) => (
              <div className="ordini__riga" key={ordinazione.nome}>
                <span className="ordini__nome">{ordinazione.nome}</span>
                <span className="riga-indice__punti" />
                <span className="ordini__prezzo">{ordinazione.prezzo}</span>
              </div>
            ))}
          </div>
        )}
        {prossima && (
          <div className="dettaglio__prossima">
            <span className="dettaglio__prossima-etichetta">Prossima</span>
            <span className="dettaglio__prossima-nome">{prossima.titolo}</span>
          </div>
        )}
      </div>

      {bacaro && !haAudio ? (
        <div className="ancora-player">
          <PulsanteGrande onClick={onOmbra}>
            <IconaBicchiere colore="#f5efe6" />+ un’ombra
          </PulsanteGrande>
        </div>
      ) : bacaro ? (
        <div className="ancora-player">
          <div className="ancora-player__riga">
            <button
              type="button"
              className="ancora-player__play"
              onClick={onAlterna}
              aria-label={inRiproduzione ? 'Metti in pausa' : 'Ascolta la tappa'}
            >
              {inRiproduzione ? <IconaPausa colore="#f5efe6" /> : <IconaPlay colore="#f5efe6" />}
            </button>
            <button
              type="button"
              className="ancora-player__corpo ancora-player__apri"
              onClick={onApriPlayer}
              aria-label="Apri il player esteso"
            >
              <span className="barra-avanzamento">
                <span
                  className="barra-avanzamento__riempimento"
                  style={{ width: `${percentuale}%` }}
                />
              </span>
              <span className="ancora-player__tempi">
                <span>{formattaTempo(posizione)}</span>
                <span>{formattaResiduo(durataAudio - posizione)}</span>
              </span>
            </button>
            <button
              type="button"
              className="ancora-player__salto"
              onClick={() => onSalta(-15)}
              aria-label="Indietro di 15 secondi"
            >
              −15
            </button>
          </div>
          <PulsanteGrande onClick={onOmbra}>
            <IconaBicchiere colore="#f5efe6" />+ un’ombra
          </PulsanteGrande>
        </div>
      ) : (
        <div className="ancora-player ancora-player--riga">
          <button
            type="button"
            className="ancora-player__play ancora-player__play--grande"
            onClick={onAlterna}
            aria-label={inRiproduzione ? 'Metti in pausa' : 'Ascolta la tappa'}
          >
            {inRiproduzione ? (
              <IconaPausa dimensione={24} colore="#f5efe6" />
            ) : (
              <IconaPlay dimensione={24} colore="#f5efe6" />
            )}
          </button>
          <button
            type="button"
            className="ancora-player__corpo ancora-player__apri"
            onClick={onApriPlayer}
            aria-label="Apri il player esteso"
          >
            <span className="ancora-player__etichetta">
              {inRiproduzione ? 'In ascolto' : 'Ascolta la tappa'}
            </span>
            <span className="barra-avanzamento">
              <span
                className="barra-avanzamento__riempimento"
                style={{ width: `${percentuale}%` }}
              />
            </span>
          </button>
          <span className="ancora-player__durata">{formattaTempo(durataAudio)}</span>
        </div>
      )}
    </div>
  )
}
