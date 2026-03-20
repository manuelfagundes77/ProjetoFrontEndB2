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

  const renderModoEdicao = () => (
    <div className="flex flex-col gap-3">
      <input
        value={tituloEdicao}
        onChange={(e) => setTituloEdicao(e.target.value)}
        className="rounded-lg px-4 py-2 outline-none border focus:border-blue-500 transition-colors"
        style={{ backgroundColor: 'var(--cor-input)', color: 'var(--cor-texto)', borderColor: 'var(--cor-borda)' }}
        placeholder="Título"
      />
      <textarea
        value={conteudoEdicao}
        onChange={(e) => setConteudoEdicao(e.target.value)}
        rows={3}
        className="rounded-lg px-4 py-2 outline-none border focus:border-blue-500 resize-none transition-colors"
        style={{ backgroundColor: 'var(--cor-input)', color: 'var(--cor-texto)', borderColor: 'var(--cor-borda)' }}
        placeholder="Conteúdo"
      />
      {erroEdicao && <span className="text-red-500 text-sm">{erroEdicao}</span>}
      <div className="flex gap-2 justify-end">
        <button
          onClick={aoCancelarEdicao}
          className="px-4 py-2 rounded-full cursor-pointer transition-colors"
          style={{ color: 'var(--cor-texto-suave)' }}
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

  const renderModoExibicao = () => (
    <>
      <h2 className="font-bold text-lg transition-colors" style={{ color: 'var(--cor-texto)' }}>
        {post.title}
      </h2>
      <p className="transition-colors" style={{ color: 'var(--cor-texto-suave)' }}>
        {post.content}
      </p>
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
    <div
      className="rounded-xl p-5 flex flex-col gap-3 transition-colors duration-300"
      style={{ backgroundColor: 'var(--cor-card)' }}
    >
      {/* Cabeçalho */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="font-bold transition-colors" style={{ color: 'var(--cor-texto)' }}>
            {post.authorName}
          </span>
          <span className="text-sm transition-colors" style={{ color: 'var(--cor-texto-suave)' }}>
            @{post.authorName.toLowerCase().replace(' ', '')}
          </span>
          <span className="text-sm transition-colors" style={{ color: 'var(--cor-texto-muted)' }}>
            · {formatarData(post.createdAt)}
          </span>
        </div>

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

      {editando ? renderModoEdicao() : renderModoExibicao()}

      {/* Botão de like */}
      <button
        onClick={aoClicarLike}
        disabled={curtindo || !estaLogado}
        className={`flex items-center gap-1 cursor-pointer w-fit transition-colors disabled:opacity-50 ${
          curtido ? 'text-red-500' : 'text-gray-400'
        }`}
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill={curtido ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
        <span className="text-sm">{contagemLikes}</span>
      </button>
    </div>
  )
}