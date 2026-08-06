import { useCallback, useEffect, useRef, useState } from 'react'

const SORGENTE_MUTA =
  'data:audio/wav;base64,UklGRiQAAABXQVZFZm10IBAAAAABAAEARKwAAIhYAQACABAAZGF0YQAAAAA='

export function useAudioGuida(sorgente: string | null) {
  const riferimento = useRef<HTMLAudioElement | null>(null)
  const [sbloccato, setSbloccato] = useState(false)
  const [inRiproduzione, setInRiproduzione] = useState(false)
  const [posizione, setPosizione] = useState(0)
  const [durata, setDurata] = useState(0)

  const elemento = useCallback(() => {
    if (!riferimento.current) {
      const audio = new Audio()
      audio.preload = 'metadata'
      audio.hidden = true
      document.body.appendChild(audio)
      riferimento.current = audio
    }
    return riferimento.current
  }, [])

  useEffect(() => {
    const audio = elemento()
    const aggiornaPosizione = () => setPosizione(audio.currentTime)
    const aggiornaDurata = () => setDurata(Number.isFinite(audio.duration) ? audio.duration : 0)
    const inizia = () => setInRiproduzione(true)
    const ferma = () => setInRiproduzione(false)
    const conclusa = () => {
      setInRiproduzione(false)
      setPosizione(audio.duration)
    }

    audio.addEventListener('timeupdate', aggiornaPosizione)
    audio.addEventListener('loadedmetadata', aggiornaDurata)
    audio.addEventListener('durationchange', aggiornaDurata)
    audio.addEventListener('play', inizia)
    audio.addEventListener('pause', ferma)
    audio.addEventListener('ended', conclusa)

    return () => {
      audio.removeEventListener('timeupdate', aggiornaPosizione)
      audio.removeEventListener('loadedmetadata', aggiornaDurata)
      audio.removeEventListener('durationchange', aggiornaDurata)
      audio.removeEventListener('play', inizia)
      audio.removeEventListener('pause', ferma)
      audio.removeEventListener('ended', conclusa)
    }
  }, [elemento])

  useEffect(() => {
    if (!sbloccato) return
    const audio = elemento()
    setPosizione(0)
    setDurata(0)
    setInRiproduzione(false)
    if (!sorgente) {
      audio.removeAttribute('src')
      audio.load()
      return
    }
    if (audio.src.endsWith(sorgente)) return
    audio.src = sorgente
    audio.load()
  }, [elemento, sorgente, sbloccato])

  const sblocca = useCallback(() => {
    const audio = elemento()
    audio.src = SORGENTE_MUTA
    setSbloccato(true)
    audio
      .play()
      .then(() => {
        audio.pause()
        audio.currentTime = 0
      })
      .catch(() => undefined)
  }, [elemento])

  const riproduci = useCallback(() => {
    const audio = elemento()
    if (sorgente && !audio.src.endsWith(sorgente)) {
      audio.src = sorgente
      audio.load()
    }
    audio.play().catch(() => undefined)
  }, [elemento, sorgente])

  const metti = useCallback(() => elemento().pause(), [elemento])

  const alterna = useCallback(() => {
    const audio = elemento()
    if (audio.paused) riproduci()
    else audio.pause()
  }, [elemento, riproduci])

  const salta = useCallback(
    (secondi: number) => {
      const audio = elemento()
      const limite = Number.isFinite(audio.duration) ? audio.duration : 0
      audio.currentTime = Math.min(Math.max(audio.currentTime + secondi, 0), limite)
      setPosizione(audio.currentTime)
    },
    [elemento],
  )

  const riavvia = useCallback(() => {
    const audio = elemento()
    audio.currentTime = 0
    setPosizione(0)
  }, [elemento])

  const azzera = useCallback(() => {
    const audio = elemento()
    audio.pause()
    audio.currentTime = 0
    setPosizione(0)
  }, [elemento])

  return {
    sbloccato,
    inRiproduzione,
    posizione,
    durata,
    sblocca,
    riproduci,
    metti,
    alterna,
    salta,
    riavvia,
    azzera,
  }
}
