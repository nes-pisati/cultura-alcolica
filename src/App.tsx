import { Mappa } from './components/Mappa'
import { MappaOffline } from './components/MappaOffline'

export default function App() {
  return (
    <div className="app">
      <header className="intestazione">
        <h1>Bacaro Tour Venezia</h1>
      </header>
      <Mappa />
      <MappaOffline />
    </div>
  )
}
