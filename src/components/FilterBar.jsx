function renderFilterGroup({ label, keyName, options, activeValue, onChange }) {
  return (
    <div className="filter-group" key={keyName}>
      <p className="filter-group-label">{label}</p>
      <div className="filter-pill-row">
        {options.map((option) => {
          const isActive = activeValue === option.value

          return (
            <button
              key={`${keyName}-${option.value}`}
              type="button"
              className="filter-pill"
              data-active={isActive}
              aria-pressed={isActive}
              onClick={() => onChange(keyName, option.value)}
            >
              {option.label}
            </button>
          )
        })}
      </div>
    </div>
  )
}

export default function FilterBar({ filters, activeFilters, onChange }) {
  const filterDefinitions = [
    { keyName: 'industry', label: 'Industry', options: filters.industry },
    { keyName: 'skill', label: 'Skill', options: filters.skill },
    { keyName: 'channel', label: 'CHANNEL', options: filters.channel },
    { keyName: 'year', label: 'Year', options: filters.year },
  ]

  return (
    <div className="filter-bar" aria-label="Filter selected work">
      {filterDefinitions.map(({ keyName, label, options }) =>
        renderFilterGroup({
          keyName,
          label,
          options,
          activeValue: activeFilters[keyName],
          onChange,
        }),
      )}
    </div>
  )
}
