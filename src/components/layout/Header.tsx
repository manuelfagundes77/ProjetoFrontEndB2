// src/components/layout/Header.tsx
import { useNavigate } from 'react-router-dom'
import { useContextoLogado } from '../../ContextAPI/ContextoLogado'
import { logout } from '../../services/autenticacao'
import BotaoTema from './BotaoTema'

interface Props {
  aoBuscar: (termo: string) => void
}

export default function Header({ aoBuscar }: Props) {
  const { estaLogado, aoDeslogar } = useContextoLogado()
  const navigate = useNavigate()

  const aoClicarLogout = async () => {
    await logout()
    aoDeslogar()
    navigate('/')
  }

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 border-b transition-colors duration-300"
      style={{ backgroundColor: 'var(--cor-header)', borderColor: 'var(--cor-borda)' }}
    >
      <div className="max-w-4xl mx-auto px-8 py-3 grid grid-cols-3 items-center gap-4">

        {/* Logo */}
        <span
          onClick={() => navigate('/')}
          className="text-blue-400 font-bold text-xl cursor-pointer"
        >
          Mini Twitter
        </span>

        {/* Busca */}
        <input
          type="text"
          placeholder="Buscar por post..."
          onChange={(e) => aoBuscar(e.target.value)}
          className="rounded-full px-4 py-2 w-full outline-none transition-colors duration-300"
          style={{
            backgroundColor: 'var(--cor-card)',
            color: 'var(--cor-texto)',
            border: '1px solid var(--cor-borda)',
          }}
        />

        {/* Botões */}
        <div className="flex justify-end items-center gap-2">
          <BotaoTema />
          {estaLogado ? (
            <button
              onClick={aoClicarLogout}
              className="rounded-full p-2 cursor-pointer transition-colors"
              style={{ backgroundColor: 'var(--cor-card)', color: 'var(--cor-texto)' }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
            </button>
          ) : (
            <div className="flex gap-2">
              <button
                onClick={() => navigate('/')}
                className="rounded-full px-4 py-2 cursor-pointer border transition-colors"
                style={{ borderColor: 'var(--cor-borda)', color: 'var(--cor-texto)' }}
              >
                Registrar-se
              </button>
              <button
                onClick={() => navigate('/')}
                className="bg-blue-500 text-white rounded-full px-4 py-2 cursor-pointer hover:bg-blue-600 transition-colors"
              >
                Login
              </button>
            </div>
          )}
        </div>

      </div>
    </header>
  )
}