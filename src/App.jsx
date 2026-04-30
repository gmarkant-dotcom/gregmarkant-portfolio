import { Routes, Route } from 'react-router-dom'
import MainPage from './pages/MainPage'
import WorkExamplesEvents from './pages/WorkExamplesEvents'

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/workexamples/events" element={<WorkExamplesEvents />} />
    </Routes>
  )
}

export default App
