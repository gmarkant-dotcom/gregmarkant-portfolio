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
          <div className="bio-headshot-placeholder">GM</div>
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
