import { useEffect, useState } from 'react'
import { TAPPE } from './dati/tappe'
import { usePosizione } from './hooks/usePosizione'
import { useRete } from './hooks/useRete'
import { useWakeLock } from './hooks/useWakeLock'
import { useTour } from './stato/useTour'
import { distanzaMetri } from './utilita/formato'
import { Benvenuto } from './components/schermate/Benvenuto'
import { Conto } from './components/schermate/Conto'
import { DettaglioTappa } from './components/schermate/DettaglioTappa'
import { Download } from './components/schermate/Download'
import { ElencoTappe } from './components/schermate/ElencoTappe'
import { IniziaTour } from './components/schermate/IniziaTour'
import { InstallaHome } from './components/schermate/InstallaHome'
import { SchermataMappa } from './components/schermate/SchermataMappa'
import { SchermataPlayer } from './components/schermate/SchermataPlayer'
import { TourCompletato } from './components/schermate/TourCompletato'

const durataTrascorsa = (istante: number | null) => {
  if (!istante) return '0h 00m'
  const minuti = Math.round((Date.now() - istante) / 60000)
  return `${Math.floor(minuti / 60)}h ${(minuti % 60).toString().padStart(2, '0')}m`
}

export default function App() {
  const tour = useTour()
  const posizione = usePosizione(tour.demo, tour.audioSbloccato)
  const online = useRete()
  const wakeLock = useWakeLock(tour.audioSbloccato)
  const [centratura, setCentratura] = useState(0)

  useEffect(() => {
    if (new URLSearchParams(window.location.search).has('demo')) tour.setDemo(true)
  }, [tour.setDemo])

  const distanza = posizione.coordinate
    ? distanzaMetri(posizione.coordinate, tour.tappaAttiva.coordinate)
    : null

  const schermata = () => {
    switch (tour.schermata) {
      case 'benvenuto':
        return <Benvenuto onAvanti={() => tour.vai('installa')} />
      case 'installa':
        return (
          <InstallaHome
            onAvanti={() => tour.vai('download')}
            onSalta={() => tour.vai('download')}
          />
        )
      case 'download':
        return <Download onAvanti={() => tour.vai('inizia')} />
      case 'inizia':
        return <IniziaTour onInizia={tour.sbloccaAudio} />
      case 'dettaglio':
        return (
          <DettaglioTappa
            tappa={tour.tappaAttiva}
            numeroTappa={tour.tappaAttiva.id}
            totaleTappe={TAPPE.length}
            prossima={TAPPE[tour.indiceAttiva + 1]}
            inRiproduzione={tour.inRiproduzione}
            posizione={tour.posizioneAudio}
            onIndietro={tour.concludiTappa}
            onAlterna={tour.alterna}
            onSalta={tour.salta}
            onOmbra={tour.aggiungiOmbra}
            onApriPlayer={() => tour.vai('player')}
          />
        )
      case 'player':
        return (
          <SchermataPlayer
            tappa={tour.tappaAttiva}
            numeroTappa={tour.tappaAttiva.id}
            totaleTappe={TAPPE.length}
            inRiproduzione={tour.inRiproduzione}
            posizione={tour.posizioneAudio}
            onChiudi={() => tour.vai('dettaglio')}
            onAlterna={tour.alterna}
            onSalta={tour.salta}
          />
        )
      case 'conto':
        return (
          <Conto
            ombre={tour.ombre}
            inizio={tour.inizio}
            onChiudi={() => tour.vai('mappa')}
            onAggiungi={tour.aggiungiOmbra}
            onTogli={tour.togliOmbra}
          />
        )
      case 'elenco':
        return (
          <ElencoTappe
            indiceAttiva={tour.indiceAttiva}
            completate={tour.completate}
            ombre={tour.ombre}
            metriRimanenti={tour.avanzamento.metriRimanenti}
            onChiudi={() => tour.vai('mappa')}
            onApriTappa={tour.apriTappa}
          />
        )
      case 'fine':
        return (
          <TourCompletato
            tappeFatte={tour.completate.length}
            ombre={tour.ombre.length}
            durata={durataTrascorsa(tour.inizioIstante)}
            onRivedi={() => tour.vai('elenco')}
            onAzzera={tour.azzera}
          />
        )
      default:
        return (
          <SchermataMappa
            tappaAttiva={tour.tappaAttiva}
            indiceAttiva={tour.indiceAttiva}
            completate={tour.completate}
            ombre={tour.ombre.length}
            distanza={distanza}
            statoPosizione={posizione.stato}
            posizione={posizione.coordinate}
            accuratezza={posizione.accuratezza}
            inRiproduzione={tour.inRiproduzione}
            posizioneAudio={tour.posizioneAudio}
            arrivo={tour.arrivo}
            demo={tour.demo}
            online={online}
            wakeLock={wakeLock}
            richiestaCentratura={centratura}
            onRicentra={() => setCentratura((valore) => valore + 1)}
            onEsciDemo={() => tour.setDemo(false)}
            onAttivaDemo={() => tour.setDemo(true)}
            onSonoQui={tour.segnalaArrivo}
            onApriTappa={tour.apriTappa}
            onApriConto={() => tour.vai('conto')}
            onApriElenco={() => tour.vai('elenco')}
            onAlterna={tour.alterna}
            onSalta={tour.salta}
            onOmbra={tour.aggiungiOmbra}
            onEntra={tour.entraNellaTappa}
            onAnnullaArrivo={tour.annullaArrivo}
          />
        )
    }
  }

  return <div className="app">{schermata()}</div>
}
