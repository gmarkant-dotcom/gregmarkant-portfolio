import { useRef } from 'react'
import clsx from 'clsx'
import { getAllThemes } from '../data/themes.config'

export default function VinylSelector({ activeTheme, onSelect }) {
  const themes = getAllThemes()
  const cardRefs = useRef({})

  function handleSelect(themeId) {
    onSelect(themeId)
  }

  return (
    <section className="vinyl-section">
      <p className="vinyl-prompt">Put your record on</p>

      <div className="vinyl-shelf">
        {themes.map((theme) => {
          const isActive = activeTheme?.id === theme.id

          return (
            <button
              key={theme.id}
              className={clsx('vinyl-card', { active: isActive })}
              onClick={() => handleSelect(theme.id)}
              aria-label={`Select ${theme.label} by ${theme.artist}`}
              ref={(el) => {
                cardRefs.current[theme.id] = el
              }}
            >
              {theme.coverImage ? (
                <img
                  src={theme.coverImage}
                  alt={`${theme.label} by ${theme.artist}`}
                  onError={(e) => {
                    // If image fails to load, swap to placeholder
                    e.currentTarget.style.display = 'none'
                    e.currentTarget.nextSibling.style.display = 'flex'
                  }}
                />
              ) : null}

              {/* Placeholder shown when no image or image fails */}
              <div
                className="vinyl-card-placeholder"
                style={{ display: theme.coverImage ? 'none' : 'flex' }}
              >
                <span className="placeholder-artist">{theme.artist}</span>
                <span className="placeholder-title">{theme.label}</span>
              </div>

              <div className="vinyl-card-active-dot" />

              <div className="vinyl-card-label">
                <span className="album-title">{theme.label}</span>
                <span className="album-artist">{theme.artist}</span>
              </div>
            </button>
          )
        })}
      </div>

      <p className={clsx('now-playing', { visible: !!activeTheme })}>
        {activeTheme
          ? `Now playing: ${activeTheme.artist} — ${activeTheme.label}`
          : ''}
      </p>
    </section>
  )
}
