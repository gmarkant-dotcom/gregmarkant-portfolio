import Ticker from './components/Ticker'
import VinylSelector from './components/VinylSelector'
import WorkGrid from './components/WorkGrid'
import { useTheme } from './hooks/useTheme'

function App() {
  const { activeTheme, applyTheme } = useTheme()

  return (
    <div>
      <div id="page-texture" aria-hidden="true" />
      <Ticker activeThemeId={activeTheme?.id ?? 'purple_rain'} />
      <div className="site-wrapper">
        <VinylSelector activeTheme={activeTheme} onSelect={applyTheme} />
        <WorkGrid activeThemeId={activeTheme?.id} />
      </div>
    </div>
  )
}

export default App
