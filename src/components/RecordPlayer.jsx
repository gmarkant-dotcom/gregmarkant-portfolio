import { useRef, useCallback, useEffect, useState } from 'react'
import clsx from 'clsx'
import { getAllThemes, getTheme } from '../data/themes.config'
import { useReducedMotion } from 'framer-motion'
import VinylRecord from './VinylRecord'
import SleeveShelf from './SleeveShelf'
import FloatingWords from './FloatingWords'
import '../styles/RecordPlayer.css'

export default function RecordPlayer({ applyTheme, activeTheme }) {
  const themes = getAllThemes()
  const reduceMotion = useReducedMotion()
  const audioRef = useRef(null)
  const bootstrappedRef = useRef(false)
  const sleeveRefs = useRef([])

  const [isSpinning, setIsSpinning] = useState(false)
  const [audioMuted, setAudioMuted] = useState(false)
  const [audioSessionActive, setAudioSessionActive] = useState(false)

  const stopAudio = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause()
      audioRef.current.currentTime = 0
    }
    audioRef.current = null
    setAudioSessionActive(false)
  }, [])

  const toggleMute = useCallback(() => {
    if (audioRef.current) {
      const newMuted = !audioMuted
      audioRef.current.muted = newMuted
      audioRef.current.volume = newMuted ? 0 : 1
      setAudioMuted(newMuted)
    }
  }, [audioMuted])

  const playThemeAudio = useCallback(
    (theme) => {
      stopAudio()
      if (!theme?.audioClip) return
      const audio = new Audio(theme.audioClip)
      audio.muted = audioMuted
      audio.volume = audioMuted ? 0 : 1
      audio.loop = false
      audio.addEventListener('play', () => setAudioSessionActive(true))
      audio.addEventListener('ended', () => setAudioSessionActive(false))
      audio.addEventListener('pause', () => {
        if (audio.currentTime === 0) setAudioSessionActive(false)
      })
      audio.play().catch(() => {})
      audioRef.current = audio
    },
    [audioMuted, stopAudio],
  )

  const playThemeAudioRef = useRef(playThemeAudio)
  playThemeAudioRef.current = playThemeAudio

  const playTrack = useCallback((themeId) => {
    const theme = getTheme(themeId)
    if (!theme) return
    playThemeAudioRef.current(theme)
  }, [])

  useEffect(() => {
    let started = false

    const timeoutId = setTimeout(() => {
      try {
        playTrack('body_talk')
      } catch {
        // ignore
      }
    }, 300)

    function startOnInteraction() {
      clearTimeout(timeoutId)
      if (started) return
      if (!audioRef.current || audioRef.current.paused) {
        started = true
        try {
          playTrack('body_talk')
        } catch {
          // ignore
        }
      }
      document.removeEventListener('click', startOnInteraction)
      document.removeEventListener('touchstart', startOnInteraction)
      document.removeEventListener('keydown', startOnInteraction)
    }

    document.addEventListener('click', startOnInteraction)
    document.addEventListener('touchstart', startOnInteraction, { passive: true })
    document.addEventListener('keydown', startOnInteraction)

    return () => {
      clearTimeout(timeoutId)
      document.removeEventListener('click', startOnInteraction)
      document.removeEventListener('touchstart', startOnInteraction)
      document.removeEventListener('keydown', startOnInteraction)
    }
  }, [playTrack])

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.muted = audioMuted
      audioRef.current.volume = audioMuted ? 0 : 1
    }
  }, [audioMuted])

  useEffect(() => {
    if (!activeTheme || bootstrappedRef.current) return
    bootstrappedRef.current = true
    const frame = requestAnimationFrame(() => {
      setIsSpinning(!reduceMotion)
    })
    return () => cancelAnimationFrame(frame)
  }, [activeTheme, reduceMotion])

  useEffect(() => {
    return () => stopAudio()
  }, [stopAudio])

  const handleSelect = useCallback(
    (themeId) => {
      if (themeId === activeTheme?.id) return
      const theme = getTheme(themeId)
      if (!theme) return

      if (reduceMotion) {
        stopAudio()
        setIsSpinning(false)
        applyTheme(themeId)
        playThemeAudio(theme)
        return
      }

      stopAudio()
      setIsSpinning(false)
      requestAnimationFrame(() => {
        applyTheme(themeId)
        setIsSpinning(true)
        playThemeAudio(theme)
      })
    },
    [activeTheme, applyTheme, playThemeAudio, reduceMotion, stopAudio],
  )

  const ambientCover = activeTheme?.coverImage ?? themes[0]?.coverImage

  return (
    <section id="player" className="record-player">
      <div className="record-player__ambient" aria-hidden="true">
        <VinylRecord
          ambient
          coverImage={ambientCover}
          isSpinning={isSpinning && !reduceMotion}
        />
      </div>

      <div className="record-player__band">
        <div className="record-player__band-floating" aria-hidden="true">
          <FloatingWords />
        </div>
        <div className="record-player__band-clip">
          <div className="record-player__band-content">
            <div className="record-player__band-sleeves">
              <SleeveShelf
                themes={themes}
                activeThemeId={activeTheme?.id}
                onSelect={handleSelect}
                sleeveRefs={sleeveRefs}
              />
            </div>
            <div className="record-player__band-controls">
              <p className={clsx('record-player__now-playing', { visible: !!activeTheme })}>
                {activeTheme ? `Now playing: ${activeTheme.nowPlaying}` : ''}
              </p>
              {audioSessionActive && !reduceMotion ? (
                <button type="button" className="record-player__mute" onClick={toggleMute}>
                  {audioMuted ? 'Unmute' : 'Mute'}
                </button>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
