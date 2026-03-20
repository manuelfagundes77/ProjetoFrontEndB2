// src/components/layout/Footer.tsx

import BotaoTema from './BotaoTema'

export default function Footer() {
  return (
    <footer className="py-6 px-6 flex items-center justify-between transition-colors" style={{ borderTop: '1px solid var(--cor-borda)' }}>
      <span className="text-blue-400 font-bold text-xl">Mini Twitter</span>
      <BotaoTema />
    </footer>
  )
}