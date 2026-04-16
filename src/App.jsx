import Ticker from './components/Ticker'
import VinylSelector from './components/VinylSelector'
import { useTheme } from './hooks/useTheme'

function App() {
  const { activeTheme, applyTheme } = useTheme()

  return (
    <>
      <Ticker />
      <div className="site-wrapper">
        <VinylSelector activeTheme={activeTheme} onSelect={applyTheme} />
        {/* Phase 4: WorkGrid goes here */}
      </div>
    </>
  )
}

export default App
