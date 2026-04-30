import Ticker from '../components/Ticker'
import RecordPlayer from '../components/RecordPlayer'
import ContactTab from '../components/ContactTab'
import BioPanel from '../components/BioPanel'
import WorkGrid from '../components/WorkGrid'
import { useTheme } from '../hooks/useTheme'

function MainPage() {
  const { activeTheme, applyTheme } = useTheme()

  return (
    <div>
      <div id="page-texture" aria-hidden="true" />
      <ContactTab />
      <Ticker activeThemeId={activeTheme?.id ?? 'purple_rain'} />
      <BioPanel />
      <RecordPlayer applyTheme={applyTheme} activeTheme={activeTheme} />
      <div className="site-wrapper">
        <WorkGrid activeThemeId={activeTheme?.id} />
      </div>
    </div>
  )
}

export default MainPage
