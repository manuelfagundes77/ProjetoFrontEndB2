// src/pages/FeedMiniTwitter.tsx

import { useQueryClient } from '@tanstack/react-query'
import { usePosts } from '../hooks/usePosts'
import Header from '../components/layout/Header'
import Footer from '../components/layout/Footer'
import CardPost from '../components/feed/CardPost'
import FormularioCriarPost from '../components/feed/FormularioCriarPost'

export default function FeedMiniTwitter() {
  const { data, isLoading, isError } = usePosts()
  const queryClient = useQueryClient()

  const aoAtualizar = () => {
    queryClient.invalidateQueries({ queryKey: ['posts'] })
  }

  return (
    <div className="min-h-screen bg-[#0d1117]">
      <Header aoBuscar={() => {}} />

      <main className="max-w-2xl mx-auto px-4 pt-24 pb-10 flex flex-col gap-4">
        {/* Formulário de criação de post */}
        <FormularioCriarPost aoPostar={aoAtualizar} />
        
        {isLoading && <p className="text-gray-400 text-center">Carregando posts...</p>}
        {isError && <p className="text-red-400 text-center">Erro ao carregar posts.</p>}

        {data?.posts.map((post) => (
          <CardPost key={post.id} post={post} aoAtualizar={aoAtualizar} />
        ))}
      </main>

      <Footer />
    </div>
  )
}