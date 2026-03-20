// Botão para alternar entre tema dark e light

import { useContextoTema } from '../../ContextAPI/ContextoTema'

export default function BotaoTema() {
  const { temaDark, alternarTema } = useContextoTema()

  return (
    <button
      onClick={alternarTema}
      className="p-2 rounded-full cursor-pointer transition-colors hover:opacity-80"
      title={temaDark ? 'Mudar para modo claro' : 'Mudar para modo escuro'}
      style={{ backgroundColor: 'var(--cor-card)', color: 'var(--cor-texto)' }}
    >
      {temaDark ? (
        // Ícone de sol — clique para ir para modo claro
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707M17.657 17.657l-.707-.707M6.343 6.343l-.707-.707M12 8a4 4 0 100 8 4 4 0 000-8z" />
        </svg>
      ) : (
        // Ícone de lua — clique para ir para modo escuro
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />
        </svg>
      )}
    </button>
  )
}