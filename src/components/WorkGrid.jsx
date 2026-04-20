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
  { id: 'skills', label: 'Skills' },
  { id: 'channels', label: 'Channels' },
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
  const [activeIndustry, setActiveIndustry] = useState(DEFAULT_PILL)
  const [activeSkill, setActiveSkill] = useState(DEFAULT_PILL)
  const [activeChannel, setActiveChannel] = useState(DEFAULT_PILL)
  const [activeDate, setActiveDate] = useState('newest')

  const filterPills = useMemo(() => {
    return {
      industry: [DEFAULT_PILL, ...getIndustries()],
      skills: [DEFAULT_PILL, ...getSkills()],
      channels: [DEFAULT_PILL, ...getChannels()],
      date: DATE_OPTIONS.map((option) => option.id),
    }
  }, [])

  const visibleProjects = useMemo(() => {
    const filtered = projects.filter((project) => {
      const industryMatch =
        activeIndustry === DEFAULT_PILL || project.industry.includes(activeIndustry)
      const skillMatch = activeSkill === DEFAULT_PILL || project.skills.includes(activeSkill)
      const channelMatch =
        activeChannel === DEFAULT_PILL || project.channels.includes(activeChannel)
      return industryMatch && skillMatch && channelMatch
    })

    const sortDirection = activeDate === 'newest' ? -1 : 1
    return [...filtered].sort((a, b) => {
      if (a.year === b.year) return a.projectName.localeCompare(b.projectName)
      return (a.year - b.year) * sortDirection
    })
  }, [activeIndustry, activeSkill, activeChannel, activeDate])

  function handlePillSelect(value) {
    if (activeTab === 'industry') setActiveIndustry(value)
    if (activeTab === 'skills') setActiveSkill(value)
    if (activeTab === 'channels') setActiveChannel(value)
    if (activeTab === 'date') setActiveDate(value)
  }

  const activePillValue =
    activeTab === 'industry'
      ? activeIndustry
      : activeTab === 'skills'
        ? activeSkill
        : activeTab === 'channels'
          ? activeChannel
          : activeDate

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
