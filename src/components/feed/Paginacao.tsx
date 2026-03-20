// src/components/feed/Paginacao.tsx
// Componente de paginação baseado no total de posts retornado pela API

interface Props {
  paginaAtual: number
  totalPosts: number
  limitePorPagina: number
  aoMudarPagina: (pagina: number) => void
}

export default function Paginacao({ paginaAtual, totalPosts, limitePorPagina, aoMudarPagina }: Props) {
  const totalPaginas = Math.ceil(totalPosts / limitePorPagina)

  if (totalPaginas <= 1) return null

  const gerarPaginas = (): (number | '...')[] => {
    const paginas: (number | '...')[] = []
    if (totalPaginas <= 5) {
      for (let i = 1; i <= totalPaginas; i++) paginas.push(i)
    } else {
      paginas.push(1)
      if (paginaAtual > 3) paginas.push('...')
      for (let i = Math.max(2, paginaAtual - 1); i <= Math.min(totalPaginas - 1, paginaAtual + 1); i++) {
        paginas.push(i)
      }
      if (paginaAtual < totalPaginas - 2) paginas.push('...')
      paginas.push(totalPaginas)
    }
    return paginas
  }

  return (
    <div className="flex items-center justify-center gap-2 py-6">
      <button
        onClick={() => aoMudarPagina(paginaAtual - 1)}
        disabled={paginaAtual === 1}
        className="cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
        style={{ color: 'var(--cor-texto-suave)' }}
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      {gerarPaginas().map((pagina, index) =>
        pagina === '...' ? (
          <span key={`reticencias-${index}`} className="px-1" style={{ color: 'var(--cor-texto-muted)' }}>...</span>
        ) : (
          <button
            key={pagina}
            onClick={() => aoMudarPagina(pagina)}
            className={`w-9 h-9 rounded-full text-sm font-semibold cursor-pointer transition-colors ${
              pagina === paginaAtual ? 'bg-blue-500 text-white' : ''
            }`}
            style={ pagina !== paginaAtual ? { color: 'var(--cor-texto-suave)' } : {}}
          >
            {pagina}
          </button>
        )
      )}

      <button
        onClick={() => aoMudarPagina(paginaAtual + 1)}
        disabled={paginaAtual === totalPaginas}
        className="cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
        style={{ color: 'var(--cor-texto-suave)' }}
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </div>
  )
}