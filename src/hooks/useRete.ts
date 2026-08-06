import { useEffect, useState } from 'react'

export function useRete() {
  const [online, setOnline] = useState(() => navigator.onLine)

  useEffect(() => {
    const aggiorna = () => setOnline(navigator.onLine)
    window.addEventListener('online', aggiorna)
    window.addEventListener('offline', aggiorna)
    return () => {
      window.removeEventListener('online', aggiorna)
      window.removeEventListener('offline', aggiorna)
    }
  }, [])

  return online
}
