// src/components/layout/Header.tsx
import { useNavigate } from 'react-router-dom'
import { useContextoLogado } from '../../ContextAPI/ContextoLogado'
import { logout } from '../../services/autenticacao'

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
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#0d1117] border-b border-gray-800">
      <div className="max-w-4xl mx-auto px-8 py-3 grid grid-cols-3 items-center">

        
        <span
          onClick={() => navigate('/feed')}
          className="text-blue-400 font-bold text-xl cursor-pointer"
        >
          Mini Twitter
        </span>

        
        <input
          type="text"
          placeholder="Buscar por post..."
          onChange={(e) => aoBuscar(e.target.value)}
          className="bg-[#1e2a3a] text-white rounded-full px-4 py-2 w-full outline-none placeholder-gray-500"
        />

        
        <div className="flex justify-end">
          {estaLogado ? (
            <button
              onClick={aoClicarLogout}
              className="bg-[#1e2a3a] text-white rounded-full p-2 cursor-pointer hover:bg-[#2a3a4a] transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
            </button>
          ) : (
            <div className="flex gap-2">
              <button
                onClick={() => navigate('/acesso')}
                className="border border-gray-600 text-white rounded-full px-4 py-2 cursor-pointer hover:bg-[#1e2a3a] transition-colors"
              >
                Registrar-se
              </button>
              <button
                onClick={() => navigate('/acesso')}
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