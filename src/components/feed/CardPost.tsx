// src/components/feed/CardPost.tsx
// Card de exibição de um post — lógica no hook useCardPost

import type { Post } from '../../types/tipos'
import { useContextoLogado } from '../../ContextAPI/ContextoLogado'
import { useCardPost } from '../../hooks/useCardPost'

interface Props {
  post: Post
  aoAtualizar: () => void
}

export default function CardPost({ post, aoAtualizar }: Props) {
  const { usuario, estaLogado } = useContextoLogado()
  const {
    curtindo, aoClicarLike, curtido, contagemLikes,
    aoClicarDeletar,
    editando, setEditando,
    tituloEdicao, setTituloEdicao,
    conteudoEdicao, setConteudoEdicao,
    salvando, erroEdicao,
    aoSalvarEdicao, aoCancelarEdicao,
    formatarData,
  } = useCardPost(post, aoAtualizar)

  const eOAutor = usuario?.id === post.authorId

  // Renderiza o formulário de edição inline
  const renderModoEdicao = () => (
    <div className="flex flex-col gap-3">
      <input
        value={tituloEdicao}
        onChange={(e) => setTituloEdicao(e.target.value)}
        className="bg-[#0d1117] text-white rounded-lg px-4 py-2 outline-none border border-gray-700 focus:border-blue-500"
        placeholder="Título"
      />
      <textarea
        value={conteudoEdicao}
        onChange={(e) => setConteudoEdicao(e.target.value)}
        rows={3}
        className="bg-[#0d1117] text-white rounded-lg px-4 py-2 outline-none border border-gray-700 focus:border-blue-500 resize-none"
        placeholder="Conteúdo"
      />
      {erroEdicao && <span className="text-red-500 text-sm">{erroEdicao}</span>}
      <div className="flex gap-2 justify-end">
        <button
          onClick={aoCancelarEdicao}
          className="px-4 py-2 rounded-full text-gray-400 hover:text-white cursor-pointer transition-colors"
        >
          Cancelar
        </button>
        <button
          onClick={aoSalvarEdicao}
          disabled={salvando}
          className="px-4 py-2 rounded-full bg-blue-500 hover:bg-blue-600 text-white cursor-pointer transition-colors disabled:opacity-50"
        >
          {salvando ? 'Salvando...' : 'Salvar'}
        </button>
      </div>
    </div>
  )

  // Renderiza o card normal de exibição
  const renderModoExibicao = () => (
    <>
      <h2 className="text-white font-bold text-lg">{post.title}</h2>
      <p className="text-gray-300">{post.content}</p>
      {post.image && (
        <img
          src={post.image}
          alt="imagem do post"
          className="rounded-lg w-full object-cover max-h-80"
        />
      )}
    </>
  )

  return (
    <div className="bg-[#1e2a3a] rounded-xl p-5 flex flex-col gap-3">

      {/* Cabeçalho: nome, @usuario, data e ícones de ação */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-white font-bold">{post.authorName}</span>
          <span className="text-gray-400 text-sm">
            @{post.authorName.toLowerCase().replace(' ', '')}
          </span>
          <span className="text-gray-500 text-sm">· {formatarData(post.createdAt)}</span>
        </div>

        {/* Ícones de editar/deletar — só para o autor e fora do modo edição */}
        {eOAutor && !editando && (
          <div className="flex gap-3">
            <button
              onClick={() => setEditando(true)}
              className="text-blue-400 cursor-pointer hover:text-blue-300 transition-colors"
              title="Editar post"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
            </button>
            <button
              onClick={aoClicarDeletar}
              className="text-red-400 cursor-pointer hover:text-red-300 transition-colors"
              title="Deletar post"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </button>
          </div>
        )}
      </div>

      {/* Conteúdo — alterna entre modo edição e exibição */}
      {editando ? renderModoEdicao() : renderModoExibicao()}

      {/* Botão de like — muda visual baseado no estado curtido */}
      <button
        onClick={aoClicarLike}
        disabled={curtindo || !estaLogado}
        className={`flex items-center gap-1 cursor-pointer w-fit transition-colors disabled:opacity-50 ${
          curtido ? 'text-red-500' : 'text-gray-400'
        }`}
      >
        {curtido ? '❤️' : '🤍'}
        <span className="text-sm">{contagemLikes}</span>
      </button>
    </div>
  )
}