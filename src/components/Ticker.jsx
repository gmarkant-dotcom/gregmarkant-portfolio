const TICKER_SEGMENTS = [
  'Greg Markant',
  '16 years in marketing',
  'C-suite ambition → measurable results',
  'Two fierce daughters',
  'Fortune 500 brands',
  'Tech, banking, CPG, pharma, retail',
  'Making teams indispensable',
  'Tennis is life',
  'Brand strategy · creative production · integrated marketing',
  'Ocean obsessed',
  'Organizational transformation',
  'Music is everything',
  'P&L ownership',
  'First-class human',
  'Sustainable growth architect',
  'World-class orchestrator',
  'High-performance philosopher',
  'Western New York raised',
  'Commerce meets culture',
  'Marketing operations',
  'The work speaks for itself',
  'NYC is home',
]

function SeparatorPurpleRain() {
  return (
    <svg width="14" height="14" viewBox="0 0 100 100" fill="currentColor" aria-hidden="true">
      <circle cx="50" cy="28" r="18" />
      <line x1="50" y1="46" x2="50" y2="72" stroke="currentColor" strokeWidth="8" />
      <line x1="32" y1="58" x2="68" y2="58" stroke="currentColor" strokeWidth="8" />
      <path d="M50,72 L44,85 Q50,95 56,85 Z" />
      <path
        d="M32,58 Q18,52 20,42 Q22,32 32,38"
        strokeWidth="6"
        fill="none"
        stroke="currentColor"
      />
    </svg>
  )
}

function SeparatorJoshuaTree() {
  return (
    <svg width="12" height="16" viewBox="0 0 60 80" fill="currentColor" aria-hidden="true">
      <rect x="27" y="40" width="6" height="40" />
      <path d="M30,40 Q20,30 10,32 Q20,20 30,25 Q40,20 50,32 Q40,30 30,40Z" />
      <path d="M30,28 Q15,15 8,18 Q18,5 30,12 Q42,5 52,18 Q45,15 30,28Z" />
      <path d="M22,35 Q12,38 8,48 Q16,42 22,45Z" />
      <path d="M38,35 Q48,38 52,48 Q44,42 38,45Z" />
    </svg>
  )
}

function SeparatorBodyTalk() {
  return (
    <svg width="14" height="14" viewBox="0 0 100 100" fill="currentColor" aria-hidden="true">
      <circle cx="50" cy="55" r="35" fill="none" stroke="currentColor" strokeWidth="3" />
      <line x1="50" y1="20" x2="50" y2="0" stroke="currentColor" strokeWidth="3" />
      <line x1="20" y1="55" x2="80" y2="55" stroke="currentColor" strokeWidth="2" />
      <line x1="50" y1="20" x2="50" y2="90" stroke="currentColor" strokeWidth="2" />
      <line x1="16" y1="38" x2="84" y2="38" stroke="currentColor" strokeWidth="1.5" />
      <line x1="16" y1="72" x2="84" y2="72" stroke="currentColor" strokeWidth="1.5" />
      <line x1="28" y1="25" x2="72" y2="85" stroke="currentColor" strokeWidth="1.5" />
      <line x1="72" y1="25" x2="28" y2="85" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  )
}

function getSeparator(themeId) {
  switch (themeId) {
    case 'joshua_tree':
      return <SeparatorJoshuaTree />
    case 'body_talk':
      return <SeparatorBodyTalk />
    case 'purple_rain':
    default:
      return <SeparatorPurpleRain />
  }
}

function TickerRun({ segments, themeId }) {
  return (
    <>
      {segments.map((segment, index) => (
        <span key={`${segment}-${index}`}>
          {index > 0 ? (
            <span className="ticker-sep" aria-hidden="true">
              {getSeparator(themeId)}
            </span>
          ) : null}
          {segment}
        </span>
      ))}
    </>
  )
}

export default function Ticker({ activeThemeId = 'purple_rain' }) {
  return (
    <div
      className="ticker-bar"
      role="marquee"
      aria-label="Greg Markant executive summary"
    >
      <div className="ticker-inner">
        <span>
          <TickerRun segments={TICKER_SEGMENTS} themeId={activeThemeId} />
          {'     '}
          <TickerRun segments={TICKER_SEGMENTS} themeId={activeThemeId} />
        </span>
      </div>
    </div>
  )
}
