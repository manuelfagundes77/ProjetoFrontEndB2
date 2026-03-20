// src/pages/FeedMiniTwitter.tsx

import { useState } from 'react'
import { useQueryClient } from '@tanstack/react-query'
import { usePosts } from '../hooks/usePosts'
import { useBusca } from '../hooks/useBusca'
import Header from '../components/layout/Header'
import Footer from '../components/layout/Footer'
import CardPost from '../components/feed/CardPost'
import FormularioCriarPost from '../components/feed/FormularioCriarPost'
import Paginacao from '../components/feed/Paginacao'

const LIMITE_POR_PAGINA = 10

export default function FeedMiniTwitter() {
  const [pagina, setPagina] = useState(1)
  const { setTermoBusca, termoDebounce } = useBusca()
  const { data, isLoading, isError } = usePosts(pagina, termoDebounce)
  const queryClient = useQueryClient()

  const aoAtualizar = () => {
    queryClient.invalidateQueries({ queryKey: ['posts'] })
  }

  const aoMudarPagina = (novaPagina: number) => {
    setPagina(novaPagina)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div className="min-h-screen transition-colors duration-300" style={{ backgroundColor: 'var(--cor-fundo)' }}>
      <Header aoBuscar={setTermoBusca} />

      <main className="max-w-2xl mx-auto px-4 pt-24 pb-10 flex flex-col gap-4">
        <FormularioCriarPost aoPostar={aoAtualizar} />

        {isLoading && <p className="text-center transition-colors" style={{ color: 'var(--cor-texto-suave)' }}>Carregando posts...</p>}
        {isError && <p className="text-red-400 text-center">Erro ao carregar posts.</p>}

        {data?.posts.length === 0 && !isLoading && (
          <p className="text-center" style={{ color: 'var(--cor-texto-suave)' }}>Nenhum post encontrado.</p>
        )}

        {data?.posts.map((post) => (
          <CardPost key={post.id} post={post} aoAtualizar={aoAtualizar} />
        ))}

        <Paginacao
          paginaAtual={pagina}
          totalPosts={data?.total ?? 0}
          limitePorPagina={LIMITE_POR_PAGINA}
          aoMudarPagina={aoMudarPagina}
        />
      </main>

      <Footer />
    </div>
  )
}