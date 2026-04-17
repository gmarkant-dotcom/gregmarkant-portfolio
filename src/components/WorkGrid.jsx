import { useMemo, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { getTheme } from '../data/themes.config'

const MotionDiv = motion.div
import { projects } from '../data/projects.data'
import FilterBar from './FilterBar'
import FlipCard from './FlipCard'
import '../styles/WorkGrid.css'

const ALL_OPTION = 'All'
const YEAR_RANGE_OPTIONS = [
  { value: ALL_OPTION, label: ALL_OPTION },
  { value: '2020-2026', label: '2020–2026', start: 2020, end: 2026 },
  { value: '2015-2019', label: '2015–2019', start: 2015, end: 2019 },
  { value: '2010-2014', label: '2010–2014', start: 2010, end: 2014 },
]

function toTitleCase(value) {
  if (!value) return value
  return value
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
}

function getProjectIndustries(project) {
  return Array.isArray(project.industry) ? project.industry : [project.industry]
}

export default function WorkGrid({ activeThemeId }) {
  const [activeIndustry, setActiveIndustry] = useState(ALL_OPTION)
  const [activeSkill, setActiveSkill] = useState(ALL_OPTION)
  const [activeYear, setActiveYear] = useState(ALL_OPTION)
  const shouldReduceMotion = useReducedMotion()

  const activeTheme = useMemo(() => getTheme(activeThemeId), [activeThemeId])

  const filters = useMemo(() => {
    const industries = Array.from(
      new Set(projects.flatMap((project) => getProjectIndustries(project))),
    ).sort()
    const skills = Array.from(new Set(projects.flatMap((project) => project.skills))).sort()

    return {
      industry: [
        { value: ALL_OPTION, label: ALL_OPTION },
        ...industries.map((industry) => ({
          value: industry,
          label: toTitleCase(industry),
        })),
      ],
      skill: [
        { value: ALL_OPTION, label: ALL_OPTION },
        ...skills.map((skill) => ({ value: skill, label: toTitleCase(skill) })),
      ],
      year: YEAR_RANGE_OPTIONS.map(({ value, label }) => ({ value, label })),
    }
  }, [])

  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      const projectIndustries = getProjectIndustries(project)
      const industryMatch =
        activeIndustry === ALL_OPTION || projectIndustries.includes(activeIndustry)
      const skillMatch = activeSkill === ALL_OPTION || project.skills.includes(activeSkill)
      const selectedYearRange = YEAR_RANGE_OPTIONS.find(
        (yearRange) => yearRange.value === activeYear,
      )
      const yearMatch =
        activeYear === ALL_OPTION ||
        (selectedYearRange &&
          project.year >= selectedYearRange.start &&
          project.year <= selectedYearRange.end)

      return industryMatch && skillMatch && yearMatch
    })
  }, [activeIndustry, activeSkill, activeYear])

  function handleFilterChange(filterKey, value) {
    if (filterKey === 'industry') setActiveIndustry(value)
    if (filterKey === 'skill') setActiveSkill(value)
    if (filterKey === 'year') setActiveYear(value)
  }

  function clearFilters() {
    setActiveIndustry(ALL_OPTION)
    setActiveSkill(ALL_OPTION)
    setActiveYear(ALL_OPTION)
  }

  return (
    <section id="work" className="work-grid-section">
      <div className="work-grid-header">
        <p className="work-grid-kicker">Portfolio</p>
        <h2 className="work-grid-title">Selected Work</h2>
      </div>

      <FilterBar
        filters={filters}
        activeFilters={{
          industry: activeIndustry,
          skill: activeSkill,
          year: activeYear,
        }}
        onChange={handleFilterChange}
      />

      <div className="work-grid" role="list">
        <AnimatePresence mode="popLayout">
          {filteredProjects.length ? (
            filteredProjects.map((project) => (
              <MotionDiv
                key={project.id}
                role="listitem"
                layout
                initial={{ opacity: 0, scale: 0.92 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{
                  opacity: 0,
                  scale: 0.92,
                  transition: {
                    opacity: {
                      duration: shouldReduceMotion ? 0 : 0.25,
                      ease: 'easeOut',
                    },
                    scale: { duration: shouldReduceMotion ? 0 : 0.25, ease: 'easeOut' },
                  },
                }}
                transition={{
                  layout: shouldReduceMotion
                    ? { duration: 0 }
                    : {
                        type: 'spring',
                        stiffness: 260,
                        damping: 28,
                      },
                  opacity: { duration: shouldReduceMotion ? 0 : 0.35, ease: 'easeOut' },
                  scale: { duration: shouldReduceMotion ? 0 : 0.35, ease: 'easeOut' },
                }}
              >
                <FlipCard project={project} theme={activeTheme} />
              </MotionDiv>
            ))
          ) : (
            <MotionDiv
              key="empty-filters"
              className="work-grid-empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: shouldReduceMotion ? 0 : 0.2 }}
            >
              <p className="work-grid-empty-text">No projects match these filters.</p>
              <button
                type="button"
                className="work-grid-clear-filters"
                onClick={clearFilters}
              >
                Clear filters
              </button>
            </MotionDiv>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}
