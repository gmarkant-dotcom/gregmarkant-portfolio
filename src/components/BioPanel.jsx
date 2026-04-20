import { useState } from 'react'
import clsx from 'clsx'

const BIO_TEXT = [
  "I grew up in western New York convinced that how things feel matters as much as how they work. Studied hospitality business at Cornell which wasn't just about hotels and service, more about the obsessive craft of designing experiences people actually remember while paying the bills. Sixteen years later, that instinct has been the through-line across every boardroom, briefing, brand campaign and collaboration since.",
  "I've led and overseen strategy, creative, and operations for some of the world's most recognized brands including JPMorgan Chase, adidas, PayPal, Samsung, and L'Or\u00e9al, building the kind of programs that move numbers and mean something. I'm equally at home architecting a VIP hospitality ecosystem, transforming a marketing department's operating model, or helping an emerging sports league figure out what it wants to be when it grows up.",
  "I'm energized by what the work does to people. The team that finally clicks, the campaign that hits different, the client who stops second-guessing and starts believing. I'm a student of high-performance psychology, a believer in empowering the people around me to do the best work of their careers, and genuinely convinced that most organizations are one good process away from being extraordinary.",
  'Based in New York City with my wife and two daughters. Avid tennis player. Ocean obsessive. Music gives a soundtrack to everything.',
]

export default function BioPanel() {
  const [open, setOpen] = useState(false)

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
          <div className="bio-record">
            <svg
              viewBox="0 0 120 120"
              width="96"
              height="96"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="60" cy="60" r="58" fill="var(--text-primary)" />
              <circle
                cx="60"
                cy="60"
                r="50"
                fill="none"
                stroke="var(--bg-secondary)"
                strokeWidth="0.4"
                opacity="0.3"
              />
              <circle
                cx="60"
                cy="60"
                r="44"
                fill="none"
                stroke="var(--bg-secondary)"
                strokeWidth="0.4"
                opacity="0.3"
              />
              <circle
                cx="60"
                cy="60"
                r="38"
                fill="none"
                stroke="var(--bg-secondary)"
                strokeWidth="0.4"
                opacity="0.3"
              />
              <circle
                cx="60"
                cy="60"
                r="32"
                fill="none"
                stroke="var(--bg-secondary)"
                strokeWidth="0.4"
                opacity="0.3"
              />
              <circle
                cx="60"
                cy="60"
                r="26"
                fill="none"
                stroke="var(--bg-secondary)"
                strokeWidth="0.4"
                opacity="0.3"
              />
              <circle cx="60" cy="60" r="16" fill="var(--accent)" />
              <text
                x="60"
                y="64"
                textAnchor="middle"
                fontSize="10"
                fontFamily="var(--font-primary)"
                fontWeight="500"
                fill="var(--bg-primary)"
                letterSpacing="1"
              >
                GM
              </text>
              <circle cx="60" cy="60" r="2.5" fill="var(--bg-secondary)" />
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
