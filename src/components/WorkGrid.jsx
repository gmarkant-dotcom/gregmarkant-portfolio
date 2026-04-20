import { useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import {
  getChannels,
  getIndustries,
  getSkills,
  projects,
} from '../data/projects.data'
import WorkTile from './WorkTile'
import '../styles/WorkGrid.css'

const FILTER_TABS = [
  { id: 'industry', label: 'Industry' },
  { id: 'skill', label: 'Skills' },
  { id: 'channel', label: 'Channels' },
  { id: 'date', label: 'Date' },
]

const DATE_OPTIONS = [
  { id: 'newest', label: 'Newest First' },
  { id: 'oldest', label: 'Oldest First' },
]

const DEFAULT_PILL = 'All'

const MotionDiv = motion.div

export default function WorkGrid() {
  const [activeTab, setActiveTab] = useState('industry')
  const [activeFilters, setActiveFilters] = useState({
    industry: null,
    skill: null,
    channel: null,
    date: null,
  })

  const filterPills = useMemo(() => {
    return {
      industry: [DEFAULT_PILL, ...getIndustries()],
      skill: [DEFAULT_PILL, ...getSkills()],
      channel: [DEFAULT_PILL, ...getChannels()],
      date: DATE_OPTIONS.map((option) => option.id),
    }
  }, [])

  const hasActiveFilters = useMemo(
    () => Object.values(activeFilters).some((value) => value !== null),
    [activeFilters],
  )

  const activeFilterEntries = useMemo(() => {
    const categoryLabels = {
      industry: 'Industry',
      skill: 'Skill',
      channel: 'Channel',
      date: 'Date',
    }

    return Object.entries(activeFilters)
      .filter(([, value]) => value !== null)
      .map(([category, value]) => ({
        category,
        label: categoryLabels[category],
        value:
          category === 'date'
            ? DATE_OPTIONS.find((option) => option.id === value)?.label ?? value
            : value,
      }))
  }, [activeFilters])

  const visibleProjects = useMemo(() => {
    const filtered = projects.filter((project) => {
      const industryMatch =
        activeFilters.industry === null || project.industry.includes(activeFilters.industry)
      const skillMatch =
        activeFilters.skill === null || project.skills.includes(activeFilters.skill)
      const channelMatch =
        activeFilters.channel === null || project.channels.includes(activeFilters.channel)
      return industryMatch && skillMatch && channelMatch
    })

    if (activeFilters.date === null) {
      return filtered
    }

    const sortDirection = activeFilters.date === 'newest' ? -1 : 1
    return [...filtered].sort((a, b) => {
      if (a.year === b.year) return a.projectName.localeCompare(b.projectName)
      return (a.year - b.year) * sortDirection
    })
  }, [activeFilters])

  function handlePillSelect(value) {
    const normalizedValue = value === DEFAULT_PILL ? null : value
    setActiveFilters((previous) => ({
      ...previous,
      [activeTab]: normalizedValue,
    }))
  }

  function removeFilter(category) {
    setActiveFilters((previous) => ({
      ...previous,
      [category]: null,
    }))
  }

  function clearAllFilters() {
    setActiveFilters({
      industry: null,
      skill: null,
      channel: null,
      date: null,
    })
  }

  const activePillValue = activeFilters[activeTab] ?? DEFAULT_PILL

  return (
    <section id="work" className="work-grid-section">
      <div className="work-grid-header">
        <p className="work-grid-kicker">Portfolio</p>
        <h2 className="work-grid-title">Selected Work</h2>
      </div>

      <div className="work-grid-filters">
        <div className="work-grid-filter-tabs">
          {FILTER_TABS.map((tab) => (
            <button
              key={tab.id}
              type="button"
              className="work-grid-filter-tab"
              data-active={activeTab === tab.id}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {hasActiveFilters ? (
          <div className="work-grid-active-filters" aria-label="Active filters">
            <div className="work-grid-active-filter-row">
              {activeFilterEntries.map((entry) => (
                <button
                  key={entry.category}
                  type="button"
                  className="work-grid-active-filter-chip"
                  onClick={() => removeFilter(entry.category)}
                  aria-label={`Remove ${entry.label}: ${entry.value}`}
                >
                  <span className="work-grid-active-filter-label">{entry.label}: </span>
                  <span className="work-grid-active-filter-value">{entry.value}</span>
                  <span className="work-grid-active-filter-close" aria-hidden="true">
                    ×
                  </span>
                </button>
              ))}
            </div>
            <button
              type="button"
              className="work-grid-clear-all"
              onClick={clearAllFilters}
            >
              Clear all
            </button>
          </div>
        ) : null}

        <div className="work-grid-pill-row">
          {filterPills[activeTab].map((pill) => {
            const label =
              activeTab === 'date'
                ? DATE_OPTIONS.find((option) => option.id === pill)?.label ?? pill
                : pill
            return (
              <button
                key={pill}
                type="button"
                className="work-grid-filter-pill"
                data-active={activePillValue === pill}
                onClick={() => handlePillSelect(pill)}
              >
                {label}
              </button>
            )
          })}
        </div>
      </div>

      <MotionDiv className="work-grid" role="list" layout>
        <AnimatePresence mode="popLayout">
          {visibleProjects.length ? (
            visibleProjects.map((project) => (
              <MotionDiv
                key={project.id}
                role="listitem"
                layout
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.3 }}
              >
                <WorkTile project={project} />
              </MotionDiv>
            ))
          ) : (
            <MotionDiv
              key="empty-filters"
              className="work-grid-empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <p className="work-grid-empty-text">No projects match this filter</p>
            </MotionDiv>
          )}
        </AnimatePresence>
      </MotionDiv>
    </section>
  )
}
