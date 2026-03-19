import { Routes, Route, Navigate } from 'react-router-dom'
import TelaAcesso from './pages/TelaAcesso'
import FeedMiniTwitter from './pages/FeedMiniTwitter'

function App() {
  const token = localStorage.getItem('tokenMiniTwitter')

  return (
    <Routes>
      <Route path="/feed" element={<FeedMiniTwitter />} />
      <Route path="/" element={<TelaAcesso />} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  )
}

export default App