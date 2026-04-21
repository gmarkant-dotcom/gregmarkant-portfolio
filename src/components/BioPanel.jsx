import { useId, useState } from 'react'
import clsx from 'clsx'

const BIO_TEXT = [
  "I grew up in western New York convinced that how things feel matters as much as how they work. Studied hospitality business at Cornell which wasn't just about hotels and service, but more so about the obsessive craft of designing experiences that resonate across form, function and flow. Sixteen years later, that instinct has been the through-line across every boardroom, briefing, brand campaign and collaboration since.",
  "I've led and overseen strategy, creative, and operations while supporting some of the world's most recognized brands including JPMorgan Chase, adidas, PayPal, Samsung, and L'Or\u00e9al, building the kind of programs that move numbers and mean something. I'm equally at home architecting bespoke agency solutions, designing VIP experiences, transforming a marketing department's operating model, or helping an emerging sports league figure out what it wants to be when it grows up.",
  "I'm energized by what the work does to people and how art and commerce symbiotically thrive. The team that finally clicks, the campaign that hits different, the client who stops second-guessing and starts believing. I'm a student of high-performance psychology, a believer in empowering the people around me to do the best work of their careers, and genuinely convinced that most organizations are one good process away from being extraordinary.",
  'Based in New York City with my wife and two daughters. Avid tennis player. Ocean obsessive. Music gives a soundtrack to everything.',
]

export default function BioPanel() {
  const [open, setOpen] = useState(false)
  const baseSvgId = useId().replace(/:/g, '')
  const sleeveClipId = `${baseSvgId}-sleeve`
  const vignetteId = `${baseSvgId}-vignette`

  return (
    <>
      <button
        type="button"
        className={clsx('bio-tab', { open })}
        onClick={() => setOpen((prev) => !prev)}
        aria-label="Toggle bio panel"
      >
        <span>Bio</span>
      </button>

      {open && <div className="bio-overlay" onClick={() => setOpen(false)} />}

      <div className={clsx('bio-panel', { open })}>
        <button
          type="button"
          className="bio-panel-close"
          onClick={() => setOpen(false)}
          aria-label="Close bio"
        >
          ×
        </button>

        <div className="bio-panel-headshot">
          <div className="bio-sleeve-wrap">
            <svg viewBox="0 0 160 110" width="160" height="110" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <clipPath id={sleeveClipId}>
                  <rect x="0" y="0" width="90" height="90" rx="4" />
                </clipPath>
                <radialGradient id={vignetteId} cx="50%" cy="50%" r="50%">
                  <stop offset="60%" stopColor="transparent" />
                  <stop offset="100%" stopColor="rgba(0,0,0,0.6)" />
                </radialGradient>
              </defs>

              <circle cx="128" cy="55" r="48" fill="#0a0a0a" />
              <circle cx="128" cy="55" r="42" fill="none" stroke="#222222" strokeWidth="0.8" />
              <circle cx="128" cy="55" r="36" fill="none" stroke="#222222" strokeWidth="0.8" />
              <circle cx="128" cy="55" r="30" fill="none" stroke="#222222" strokeWidth="0.8" />
              <circle cx="128" cy="55" r="24" fill="none" stroke="#222222" strokeWidth="0.8" />
              <circle cx="128" cy="55" r="18" fill="none" stroke="#222222" strokeWidth="0.8" />
              <circle cx="128" cy="55" r="10" fill="var(--accent)" />
              <text
                x="128"
                y="58"
                textAnchor="middle"
                fontSize="5"
                fontFamily="var(--font-primary)"
                fontWeight="500"
                fill="var(--bg-primary)"
                letterSpacing="0.5"
              >
                GM
              </text>
              <circle cx="128" cy="55" r="2" fill="#0a0a0a" />

              <rect x="0" y="0" width="90" height="90" rx="4" fill="#111111" />
              <image
                href="/IMG_9577.jpeg"
                x="0"
                y="0"
                width="90"
                height="90"
                clipPath={`url(#${sleeveClipId})`}
                preserveAspectRatio="xMidYMid slice"
              />
              <rect x="0" y="0" width="90" height="90" rx="4" fill={`url(#${vignetteId})`} />
              <rect
                x="0"
                y="0"
                width="90"
                height="90"
                rx="4"
                fill="none"
                stroke="rgba(255,255,255,0.15)"
                strokeWidth="0.5"
              />
              <rect x="82" y="0" width="8" height="90" rx="0" fill="rgba(0,0,0,0.3)" />
            </svg>
          </div>
        </div>

        <div className="bio-panel-content">
          {BIO_TEXT.map((paragraph, i) => (
            <p key={i}>{paragraph}</p>
          ))}
        </div>
      </div>
    </>
  )
}
