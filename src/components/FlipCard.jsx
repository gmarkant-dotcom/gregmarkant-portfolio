import { useMemo, useState } from 'react'
import clsx from 'clsx'
import { motion, useReducedMotion } from 'framer-motion'
import '../styles/FlipCard.css'

const MotionArticle = motion.article

function formatYearRange(year, endYear) {
  if (!endYear) {
    return `${year}–Present`
  }

  if (year === endYear) {
    return `${year}`
  }

  return `${year}–${endYear}`
}

export default function FlipCard({ project, theme }) {
  const [isFlipped, setIsFlipped] = useState(false)
  const shouldReduceMotion = useReducedMotion()
  const isTouchDevice = useMemo(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return false
    return window.matchMedia('(hover: none), (pointer: coarse)').matches
  }, [])

  const hoverY = theme?.cardHoverY ?? 0
  const projectIndustry = Array.isArray(project.industry)
    ? project.industry.join(' • ')
    : project.industry

  function handleTouchToggle() {
    if (!isTouchDevice) return
    setIsFlipped((prev) => !prev)
  }

  function handleKeyDown(event) {
    if (!isTouchDevice) return
    if (event.key !== 'Enter' && event.key !== ' ') return
    event.preventDefault()
    setIsFlipped((prev) => !prev)
  }

  return (
    <MotionArticle
      className={clsx('flip-card', { 'reduce-motion': shouldReduceMotion })}
      role="article"
      tabIndex={isTouchDevice ? 0 : -1}
      aria-label={`${project.client} — ${project.projectName}`}
      data-theme-id={theme?.id}
      data-card-hover-scale={theme?.cardHoverScale}
      data-card-shadow={theme?.cardShadow}
      onClick={handleTouchToggle}
      onKeyDown={handleKeyDown}
      whileHover={
        isTouchDevice || shouldReduceMotion
          ? undefined
          : {
              y: hoverY,
              scale: theme?.cardHoverScale ?? 1,
              boxShadow: theme?.cardShadow ?? 'none',
            }
      }
      transition={{ duration: shouldReduceMotion ? 0 : 0.25, ease: 'easeOut' }}
    >
      <div className={clsx('flip-card-inner', { 'is-flipped': isFlipped })}>
        <div
          className="flip-card-face flip-card-front"
          style={{ backgroundImage: `url(${project.heroImage})` }}
        >
          <div className="flip-card-front-overlay">
            <p className="flip-card-front-client">{project.client}</p>
            <h3 className="flip-card-front-title">{project.projectName}</h3>
          </div>
          {project.featured ? (
            <span className="flip-card-featured-badge">Featured</span>
          ) : null}
        </div>

        <div className="flip-card-face flip-card-back">
          <div className="flip-card-back-inner">
            <p className="flip-card-back-industry">{projectIndustry}</p>
            <h3 className="flip-card-back-title">{project.projectName}</h3>
            <p className="flip-card-back-client">{project.client}</p>
            <p className="flip-card-back-year">
              {formatYearRange(project.year, project.endYear)}
            </p>
            <p className="flip-card-back-caption">{project.caption}</p>
            <div className="flip-card-back-skills">
              {project.skills.map((skill) => (
                <span key={`${project.id}-${skill}`} className="flip-card-skill-pill">
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </MotionArticle>
  )
}
