// src/components/feed/FormularioCriarPost.tsx
// Formulário para criar novos posts
// POST http://localhost:3000/posts

import { useState, useRef } from 'react'
import { useContextoLogado } from '../../ContextAPI/ContextoLogado'
import { criarPost } from '../../services/posts'
import { useNavigate } from 'react-router-dom'

interface Props {
  aoPostar: () => void
}

const TAMANHO_MAXIMO_MB = 5

export default function FormularioCriarPost({ aoPostar }: Props) {
  const { estaLogado } = useContextoLogado()
  const navigate = useNavigate()
  const inputArquivoRef = useRef<HTMLInputElement>(null)

  const [titulo, setTitulo] = useState('')
  const [conteudo, setConteudo] = useState('')
  const [imagemBase64, setImagemBase64] = useState('')
  const [previewImagem, setPreviewImagem] = useState('')
  const [postando, setPostando] = useState(false)
  const [erro, setErro] = useState('')

  // Converte o arquivo para base64 e valida o tamanho
  const aoSelecionarImagem = (e: React.ChangeEvent<HTMLInputElement>) => {
    const arquivo = e.target.files?.[0]
    if (!arquivo) return

    const tamanhoMB = arquivo.size / (1024 * 1024)
    if (tamanhoMB > TAMANHO_MAXIMO_MB) {
      setErro(`A imagem deve ter no máximo ${TAMANHO_MAXIMO_MB}MB`)
      return
    }

    const leitor = new FileReader()
    leitor.onload = () => {
      const resultado = leitor.result as string
      setImagemBase64(resultado)
      setPreviewImagem(resultado)
      setErro('')
    }
    leitor.readAsDataURL(arquivo)
  }

  const aoRemoverImagem = () => {
    setImagemBase64('')
    setPreviewImagem('')
    if (inputArquivoRef.current) inputArquivoRef.current.value = ''
  }

  const aoClicarPostar = async () => {
    if (!estaLogado) {
      const confirmar = confirm('Você precisa estar logado para postar. Deseja ir para o login?')
      if (confirmar) navigate('/')
      return
    }

    if (!titulo.trim() || !conteudo.trim()) {
      setErro('Título e conteúdo são obrigatórios')
      return
    }

    setPostando(true)
    setErro('')

    try {
      await criarPost(titulo, conteudo, imagemBase64 || undefined)
      setTitulo('')
      setConteudo('')
      setImagemBase64('')
      setPreviewImagem('')
      if (inputArquivoRef.current) inputArquivoRef.current.value = ''
      aoPostar()
    } catch {
      setErro('Erro ao criar post. Tente novamente.')
    } finally {
      setPostando(false)
    }
  }

  return (
    <div className="bg-[#1e2a3a] rounded-xl p-5 flex flex-col gap-3">

      {/* Campo de título */}
      <input
        value={titulo}
        onChange={(e) => setTitulo(e.target.value)}
        placeholder="Título do post"
        className="bg-transparent text-white outline-none placeholder-gray-500 font-semibold text-lg border-b border-gray-700 pb-2"
      />

      {/* Campo de conteúdo */}
      <textarea
        value={conteudo}
        onChange={(e) => setConteudo(e.target.value)}
        placeholder="E aí, o que está rolando?"
        rows={3}
        className="bg-transparent text-white outline-none placeholder-gray-500 resize-none"
      />

      {/* Preview da imagem selecionada */}
      {previewImagem && (
        <div className="relative">
          <img
            src={previewImagem}
            alt="preview"
            className="rounded-lg w-full object-cover max-h-60"
          />
          <button
            onClick={aoRemoverImagem}
            className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white rounded-full p-1 cursor-pointer"
            title="Remover imagem"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      )}

      {erro && <span className="text-red-500 text-sm">{erro}</span>}

      {/* Rodapé do formulário */}
      <div className="flex items-center justify-between pt-2 border-t border-gray-700">

        {/* Input de arquivo escondido */}
        <input
          ref={inputArquivoRef}
          type="file"
          accept="image/*"
          onChange={aoSelecionarImagem}
          className="hidden"
        />

        {/* Ícone de imagem — abre o seletor de arquivo */}
        <button
          onClick={() => inputArquivoRef.current?.click()}
          className="text-blue-400 cursor-pointer hover:text-blue-300 transition-colors"
          title="Adicionar imagem (máx. 5MB)"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        </button>

        {/* Botão postar */}
        <button
          onClick={aoClicarPostar}
          disabled={postando}
          className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-full cursor-pointer transition-colors disabled:opacity-50"
        >
          {postando ? 'Postando...' : 'Postar'}
        </button>
      </div>
    </div>
  )
}