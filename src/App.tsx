// src/App.tsx
import { Routes, Route, Navigate } from 'react-router-dom'
import TelaAcesso from './pages/TelaAcesso'
import FeedMiniTwitter from './pages/FeedMiniTwitter'
import { useContextoLogado } from './ContextAPI/ContextoLogado'

function App() {
  const { estaLogado } = useContextoLogado()

  return (
    <Routes>
      <Route path="/" element={estaLogado ? <Navigate to="/feed" /> : <TelaAcesso />} />
      <Route path="/feed" element={<FeedMiniTwitter />} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  )
}

export default App