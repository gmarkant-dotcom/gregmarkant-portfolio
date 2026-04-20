import clsx from 'clsx'

export default function SleeveShelf({ themes, activeThemeId, onSelect, sleeveRefs }) {
  return (
    <div className="sleeve-shelf" role="group" aria-label="Album sleeves">
      {themes.map((theme, index) => {
        const isActive = activeThemeId === theme.id
        const label = `Play ${theme.label} by ${theme.artist} and apply ${theme.label} theme`

        return (
          <button
            key={theme.id}
            type="button"
            className={clsx('sleeve-shelf__sleeve', isActive && 'sleeve-shelf__sleeve--active')}
            onClick={() => onSelect(theme.id)}
            aria-pressed={isActive}
            aria-label={label}
            ref={(el) => {
              sleeveRefs.current[index] = el
            }}
          >
            {theme.coverImage ? (
              <img
                className="sleeve-shelf__art"
                src={theme.coverImage}
                alt=""
                draggable={false}
              />
            ) : (
              <div className="sleeve-shelf__placeholder">
                <span>{theme.artist}</span>
              </div>
            )}
          </button>
        )
      })}
    </div>
  )
}
