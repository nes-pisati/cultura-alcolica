import { useState, type ReactNode } from 'react'
import { AvvisoDiSistema } from '../base/AvvisoDiSistema'
import { IconaAggiungi, IconaBicchiere, IconaCondividi } from '../base/Icone'
import { PulsanteGrande, PulsantePillola } from '../base/Pulsanti'

type Sistema = 'iPhone' | 'Android'

const passi: Record<Sistema, { testo: ReactNode; icona: ReactNode; piena?: boolean }[]> =
  {
    iPhone: [
      {
        testo: (
          <>
            Tocca <strong>Condividi</strong> nella barra di Safari
          </>
        ),
        icona: <IconaCondividi colore="#23201d" />,
      },
      {
        testo: (
          <>
            Scorri e scegli <strong>Aggiungi alla schermata Home</strong>
          </>
        ),
        icona: <IconaAggiungi colore="#23201d" />,
      },
      {
        testo: 'Apri l’app dall’icona e torna qui',
        icona: <IconaBicchiere dimensione={18} colore="#f5efe6" />,
        piena: true,
      },
    ],
    Android: [
      {
        testo: (
          <>
            Apri il menu <strong>⋮</strong> in Chrome
          </>
        ),
        icona: <IconaCondividi colore="#23201d" />,
      },
      {
        testo: (
          <>
            Scegli <strong>Installa app</strong>
          </>
        ),
        icona: <IconaAggiungi colore="#23201d" />,
      },
      {
        testo: 'Apri l’app dall’icona e torna qui',
        icona: <IconaBicchiere dimensione={18} colore="#f5efe6" />,
        piena: true,
      },
    ],
  }

type Proprieta = {
  onAvanti: () => void
  onSalta: () => void
}

export function InstallaHome({ onAvanti, onSalta }: Proprieta) {
  const [sistema, setSistema] = useState<Sistema>('iPhone')

  return (
    <div className="schermata">
      <div className="schermata__corpo">
        <div className="sovratitolo">Passo 2 di 4</div>
        <h1 className="titolo-schermata">Mettila nella schermata Home</h1>
        <p className="testo-narrativo">
          Così il telefono non cancella mappa e audio, e l’app si apre a schermo pieno.
        </p>
        <div className="installa__scelta">
          {(['iPhone', 'Android'] as Sistema[]).map((nome) => (
            <button
              key={nome}
              type="button"
              className={`installa__sistema${sistema === nome ? ' installa__sistema--attivo' : ''}`}
              onClick={() => setSistema(nome)}
            >
              {nome}
            </button>
          ))}
        </div>
        <div className="installa__passi">
          {passi[sistema].map((passo, indice) => (
            <div className="installa__passo" key={indice}>
              <span className="installa__numero">{indice + 1}</span>
              <span className="installa__testo">{passo.testo}</span>
              <span className={`installa__icona${passo.piena ? ' installa__icona--piena' : ''}`}>
                {passo.icona}
              </span>
            </div>
          ))}
        </div>
        <div className="schermata__piede">
          <AvvisoDiSistema
            peso="attenzione"
            icona="attenzione"
            titolo="Se salti questo passo, dopo una settimana senza aprirla il telefono può cancellare i file scaricati."
          />
          <div className="installa__azioni">
            <PulsanteGrande onClick={onAvanti}>Fatto, l’ho aggiunta</PulsanteGrande>
            <PulsantePillola neutro largo onClick={onSalta}>
              Salta per ora
            </PulsantePillola>
          </div>
        </div>
      </div>
    </div>
  )
}
