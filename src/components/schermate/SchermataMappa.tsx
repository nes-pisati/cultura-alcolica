import { TAPPE, type Tappa } from '../../dati/tappe'
import type { StatoPosizione } from '../../hooks/usePosizione'
import { formattaDistanza, formattaTempo } from '../../utilita/formato'
import { Mappa } from '../Mappa'
import { AvvisoDiSistema } from '../base/AvvisoDiSistema'
import { BadgeInAscolto, BadgeTipo } from '../base/Badge'
import { BandaDemo } from '../base/BandaDemo'
import { IconaBicchiere, IconaMirino, IconaPlay } from '../base/Icone'
import { PlayerCompatto } from '../base/PlayerCompatto'
import { PulsanteFlottante, PulsanteGrande, PulsantePillola } from '../base/Pulsanti'

type Proprieta = {
  tappaAttiva: Tappa
  indiceAttiva: number
  completate: number[]
  ombre: number
  distanza: number | null
  statoPosizione: StatoPosizione
  posizione: [number, number] | null
  accuratezza: number | null
  inRiproduzione: boolean
  posizioneAudio: number
  arrivo: boolean
  demo: boolean
  online: boolean
  wakeLock: { attivo: boolean; disponibile: boolean }
  richiestaCentratura: number
  onRicentra: () => void
  onEsciDemo: () => void
  onAttivaDemo: () => void
  onSonoQui: () => void
  onApriTappa: (id: number) => void
  onApriConto: () => void
  onApriElenco: () => void
  onAlterna: () => void
  onSalta: (secondi: number) => void
  onOmbra: () => void
  onEntra: () => void
  onAnnullaArrivo: () => void
}

const altezzaComandi = (arrivo: boolean, inRiproduzione: boolean, avvisoVisibile: boolean) => {
  if (arrivo) return 430
  if (inRiproduzione) return 430
  if (avvisoVisibile) return 298
  return 216
}

export function SchermataMappa({
  tappaAttiva,
  indiceAttiva,
  completate,
  ombre,
  distanza,
  statoPosizione,
  posizione,
  accuratezza,
  inRiproduzione,
  posizioneAudio,
  arrivo,
  demo,
  online,
  wakeLock,
  richiestaCentratura,
  onRicentra,
  onEsciDemo,
  onAttivaDemo,
  onSonoQui,
  onApriTappa,
  onApriConto,
  onApriElenco,
  onAlterna,
  onSalta,
  onOmbra,
  onEntra,
  onAnnullaArrivo,
}: Proprieta) {
  const imprecisa = statoPosizione === 'imprecisa'
  const scartata = statoPosizione === 'scartata'
  const negata = statoPosizione === 'negata'
  const avvisoPosizione = imprecisa || scartata
  const bacaro = tappaAttiva.tipo === 'bacaro'
  const durataAudio = tappaAttiva.durataAudio ?? 0
  const haAudio = durataAudio > 0

  return (
    <div className="schermata-mappa">
      <div className="schermata-mappa__tela">
        <Mappa
          indiceAttiva={indiceAttiva}
          completate={completate}
          posizione={posizione}
          accuratezza={accuratezza}
          imprecisa={imprecisa}
          richiestaCentratura={richiestaCentratura}
          onApriTappa={onApriTappa}
        />
      </div>

      <div className="schermata-mappa__alto">
        {demo && <BandaDemo onEsci={onEsciDemo} />}
        <button type="button" className="barra-tappa" onClick={onApriElenco}>
          <span className="barra-tappa__numero">{tappaAttiva.id}</span>
          <span className="barra-tappa__corpo">
            <span className="sovratitolo sovratitolo--piccolo">
              {inRiproduzione ? 'Sei in ascolto' : 'Prossima tappa'}
            </span>
            <span className="barra-tappa__titolo">{tappaAttiva.titolo}</span>
          </span>
          <span className="barra-tappa__distanza">
            <span className="barra-tappa__valore">
              {distanza === null
                ? '—'
                : distanza < 25
                  ? 'qui'
                  : `${imprecisa ? '~' : ''}${formattaDistanza(distanza)}`}
            </span>
            <span className="barra-tappa__unita">alla tappa</span>
          </span>
        </button>
      </div>

      {(avvisoPosizione || negata || !online) && (
        <div
          className="schermata-mappa__avviso"
          style={{ bottom: altezzaComandi(arrivo, inRiproduzione, true) - 66 }}
        >
          {negata ? (
            <AvvisoDiSistema
              peso="bloccante"
              titolo="Non sappiamo dove sei"
              titoloSerif
              dettaglio="La posizione è disattivata per questa app. Puoi riattivarla nelle impostazioni del telefono, oppure seguire il percorso a occhio e avviare le tappe a mano."
              istruzione="Impostazioni › Safari › Posizione › Chiedi"
              azioni={
                <>
                  <PulsanteGrande chiaro onClick={onAttivaDemo}>
                    Avanza a mano
                  </PulsanteGrande>
                </>
              }
            />
          ) : imprecisa ? (
            <AvvisoDiSistema
              peso="attenzione"
              icona="attenzione"
              titolo={`Qui il GPS sbaglia di ${formattaDistanza(accuratezza ?? 40)}.`}
              dettaglio="Il cerchio tratteggiato è l’incertezza. Se riconosci il posto, dillo tu."
            />
          ) : scartata ? (
            <AvvisoDiSistema
              peso="informativo"
              icona="info"
              titolo="Il segnale qui non basta."
              dettaglio="Il percorso resta sulla mappa. Riprova appena esci dalla calle, o usa «Sono qui»."
            />
          ) : (
            <AvvisoDiSistema
              peso="informativo"
              icona="rete"
              titolo="Sei senza rete. Mappa e audio sono già sul telefono."
            />
          )}
        </div>
      )}

      <div
        className="schermata-mappa__comandi"
        style={{ bottom: altezzaComandi(arrivo, inRiproduzione, avvisoPosizione) }}
      >
        <PulsanteFlottante onClick={onRicentra} aria-label="Ricentra la mappa">
          <IconaMirino colore="#23201d" />
        </PulsanteFlottante>
        <PulsanteFlottante conto={ombre} onClick={onApriConto} aria-label="Il conto delle ombre">
          <IconaBicchiere dimensione={24} colore="#23201d" />
        </PulsanteFlottante>
      </div>

      {arrivo && <div className="schermata-mappa__velo" />}

      {arrivo ? (
        <div className="sheet sheet--arrivo">
          <div className="arrivo__testata">
            <span className="arrivo__numero">{tappaAttiva.id}</span>
            <div>
              <div className="sovratitolo sovratitolo--piccolo">Sei arrivato</div>
              <div className="arrivo__titolo">{tappaAttiva.titolo}</div>
            </div>
          </div>
          <p className="arrivo__testo">
            {haAudio
              ? 'L’audioguida parte da sola. Se preferisci, fermala e leggi.'
              : 'Nessuna audioguida qui: si beve e basta.'}
          </p>
          {haAudio && (
            <PlayerCompatto
              inRiproduzione={inRiproduzione}
              posizione={posizioneAudio}
              durata={durataAudio}
              onAlterna={onAlterna}
            />
          )}
          <div className="sheet__azioni sheet__azioni--colonna">
            <PulsanteGrande onClick={onEntra}>Apri la tappa</PulsanteGrande>
            <PulsantePillola neutro largo onClick={onAnnullaArrivo}>
              Non sono ancora qui
            </PulsantePillola>
          </div>
        </div>
      ) : inRiproduzione ? (
        <div className="sheet sheet--media">
          <button type="button" className="sheet__presa" onClick={onEntra} aria-label="Apri la tappa" />
          <div className="sheet__intestazione">
            <span className="sovratitolo sovratitolo--piccolo">
              {`Tappa ${tappaAttiva.id} di ${TAPPE.length}`}
            </span>
            <BadgeTipo tipo={tappaAttiva.tipo} />
            <BadgeInAscolto />
          </div>
          <h2 className="titolo-tappa sheet__titolo">{tappaAttiva.titolo}</h2>
          <PlayerCompatto
            inRiproduzione={inRiproduzione}
            posizione={posizioneAudio}
            durata={durataAudio}
            onAlterna={onAlterna}
            onSalta={onSalta}
            onTesto={onEntra}
          />
          {tappaAttiva.paragrafi && (
            <p className="sheet__anteprima">{tappaAttiva.paragrafi[0]}</p>
          )}
          <div className="sheet__azioni">
            {bacaro ? (
              <>
                <PulsanteGrande onClick={onOmbra}>+ un’ombra</PulsanteGrande>
                <PulsantePillola neutro onClick={onEntra}>
                  Cosa
                  <br />
                  ordinare
                </PulsantePillola>
              </>
            ) : (
              <PulsanteGrande onClick={onEntra}>Apri la tappa</PulsanteGrande>
            )}
          </div>
        </div>
      ) : (
        <div className="sheet">
          <button type="button" className="sheet__presa" onClick={onEntra} aria-label="Apri la tappa" />
          {avvisoPosizione ? (
            <>
              <div className="riga-wakelock">
                <span className="riga-wakelock__spia" />
                <span>
                  {wakeLock.disponibile
                    ? 'Tieni lo schermo acceso e l’app aperta'
                    : 'Questo telefono non tiene lo schermo acceso da solo'}
                </span>
                {wakeLock.attivo && <span className="riga-wakelock__stato">attivo</span>}
              </div>
              <PulsanteGrande onClick={onSonoQui}>Sono qui</PulsanteGrande>
            </>
          ) : (
            <>
              <div className="sheet__intestazione">
                <span className="sovratitolo sovratitolo--piccolo">
                  {`Tappa ${tappaAttiva.id} di ${TAPPE.length}`}
                </span>
                <BadgeTipo tipo={tappaAttiva.tipo} />
              </div>
              <h2 className="titolo-tappa sheet__titolo">{tappaAttiva.titolo}</h2>
              <div className="sheet__azioni">
                <PulsanteGrande onClick={onEntra}>
                  <IconaPlay dimensione={20} colore="#f5efe6" />
                  {`Ascolta · ${formattaTempo(durataAudio)}`}
                </PulsanteGrande>
                <PulsantePillola onClick={onSonoQui}>Sono qui</PulsantePillola>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  )
}
