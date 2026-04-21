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
  const sleeveClipId = useId().replace(/:/g, '')

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
            <svg viewBox="0 0 110 120" width="110" height="120" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <clipPath id={sleeveClipId}>
                  <rect x="0" y="10" width="80" height="80" rx="3" />
                </clipPath>
              </defs>

              <circle cx="82" cy="72" r="36" fill="#111111" opacity="0.3" />

              <circle cx="82" cy="72" r="35" fill="#111111" />
              <circle cx="82" cy="72" r="30" fill="none" stroke="#333333" strokeWidth="0.5" />
              <circle cx="82" cy="72" r="24" fill="none" stroke="#333333" strokeWidth="0.5" />
              <circle cx="82" cy="72" r="18" fill="none" stroke="#333333" strokeWidth="0.5" />
              <circle cx="82" cy="72" r="12" fill="none" stroke="#333333" strokeWidth="0.5" />
              <circle cx="82" cy="72" r="8" fill="var(--accent)" />
              <text
                x="82"
                y="75"
                textAnchor="middle"
                fontSize="5"
                fontFamily="var(--font-primary)"
                fontWeight="500"
                fill="var(--bg-primary)"
                letterSpacing="0.5"
              >
                GM
              </text>
              <circle cx="82" cy="72" r="1.5" fill="#111111" />

              <rect
                x="0"
                y="10"
                width="80"
                height="80"
                rx="3"
                fill="var(--bg-secondary)"
                stroke="var(--border-color)"
                strokeWidth="0.5"
              />
              <image
                href="/IMG_9577.jpeg"
                x="0"
                y="10"
                width="80"
                height="80"
                clipPath={`url(#${sleeveClipId})`}
                preserveAspectRatio="xMidYMid slice"
              />
              <rect
                x="0"
                y="10"
                width="80"
                height="80"
                rx="3"
                fill="none"
                stroke="var(--border-color)"
                strokeWidth="0.5"
              />
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
