const TICKER_TEXT =
  'Greg Markant · World-class orchestrator · First-class human · 16 years translating C-suite ambition into programs that drive KPIs, unlock revenue, and make teams indispensable · Fortune 500 clients across tech, CPG, retail, banking, pharma, and beyond · Integrated marketing · Brand strategy · Creative production · Marketing operations · P&L ownership · Two fierce daughters · Tennis is life · Music is everything'

export default function Ticker() {
  // We duplicate the text string so the CSS animation loops seamlessly
  const repeated = `${TICKER_TEXT}     ${TICKER_TEXT}`

  return (
    <div
      className="ticker-bar"
      role="marquee"
      aria-label="Greg Markant executive summary"
    >
      <div className="ticker-inner">
        <span>{repeated}</span>
      </div>
    </div>
  )
}
