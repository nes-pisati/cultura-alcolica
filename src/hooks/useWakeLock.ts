import { useEffect, useState } from 'react'

export function useWakeLock(richiesto: boolean) {
  const disponibile = typeof navigator !== 'undefined' && 'wakeLock' in navigator
  const [attivo, setAttivo] = useState(false)

  useEffect(() => {
    if (!richiesto || !disponibile) {
      setAttivo(false)
      return
    }

    let blocco: WakeLockSentinel | null = null
    let annullato = false

    const richiedi = async () => {
      try {
        blocco = await navigator.wakeLock.request('screen')
        if (annullato) {
          await blocco.release()
          return
        }
        blocco.addEventListener('release', () => setAttivo(false))
        setAttivo(true)
      } catch {
        setAttivo(false)
      }
    }

    const alRitorno = () => {
      if (document.visibilityState === 'visible') void richiedi()
    }

    void richiedi()
    document.addEventListener('visibilitychange', alRitorno)

    return () => {
      annullato = true
      document.removeEventListener('visibilitychange', alRitorno)
      void blocco?.release()
      setAttivo(false)
    }
  }, [richiesto, disponibile])

  return { attivo, disponibile }
}
