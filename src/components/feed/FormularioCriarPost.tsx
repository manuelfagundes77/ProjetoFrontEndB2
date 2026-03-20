// src/components/feed/FormularioCriarPost.tsx
// Formulário para criar novos posts usando React Hook Form + Zod
// POST http://localhost:3000/posts

import { useState, useRef } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useContextoLogado } from '../../ContextAPI/ContextoLogado'
import { criarPost } from '../../services/posts'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const TAMANHO_MAXIMO_MB = 5

const esquemaCriarPost = z.object({
  titulo: z.string().min(3, 'Título deve ter no mínimo 3 caracteres'),
  conteudo: z.string().min(1, 'Conteúdo é obrigatório'),
})

type DadosCriarPost = z.infer<typeof esquemaCriarPost>

interface Props {
  aoPostar: () => void
}

export default function FormularioCriarPost({ aoPostar }: Props) {
  const { estaLogado } = useContextoLogado()
  const navigate = useNavigate()
  const inputArquivoRef = useRef<HTMLInputElement>(null)

  const [imagemBase64, setImagemBase64] = useState('')
  const [previewImagem, setPreviewImagem] = useState('')
  const [erroImagem, setErroImagem] = useState('')
  const [erroAPI, setErroAPI] = useState('')

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<DadosCriarPost>({
    resolver: zodResolver(esquemaCriarPost),
  })

  const aoSelecionarImagem = (e: React.ChangeEvent<HTMLInputElement>) => {
    const arquivo = e.target.files?.[0]
    if (!arquivo) return
    const tamanhoMB = arquivo.size / (1024 * 1024)
    if (tamanhoMB > TAMANHO_MAXIMO_MB) {
      setErroImagem(`A imagem deve ter no máximo ${TAMANHO_MAXIMO_MB}MB`)
      return
    }
    const leitor = new FileReader()
    leitor.onload = () => {
      const resultado = leitor.result as string
      setImagemBase64(resultado)
      setPreviewImagem(resultado)
      setErroImagem('')
    }
    leitor.readAsDataURL(arquivo)
  }

  const aoRemoverImagem = () => {
    setImagemBase64('')
    setPreviewImagem('')
    if (inputArquivoRef.current) inputArquivoRef.current.value = ''
  }

  const aoEnviar = async (dados: DadosCriarPost) => {
    if (!estaLogado) {
      const confirmar = confirm('Você precisa estar logado para postar. Deseja ir para o login?')
      if (confirmar) navigate('/')
      return
    }
    setErroAPI('')
    try {
      await criarPost(dados.titulo, dados.conteudo, imagemBase64 || undefined)
      reset()
      aoRemoverImagem()
      aoPostar()
    } catch (erro) {
      if (axios.isAxiosError(erro)) {
        setErroAPI(erro.response?.data?.error || 'Erro ao criar post.')
      } else {
        setErroAPI('Erro ao criar post. Tente novamente.')
      }
    }
  }

  return (
    <form
      onSubmit={handleSubmit(aoEnviar)}
      className="rounded-xl p-5 flex flex-col gap-3 transition-colors duration-300"
      style={{ backgroundColor: 'var(--cor-card)' }}
      
    >
      {/* Campo de título */}
      <input
        {...register('titulo')}
        placeholder="Título do post"
        className="bg-transparent outline-none font-semibold text-lg pb-2 transition-colors"
        style={{
          color: 'var(--cor-texto)',
          borderBottom: '1px solid var(--cor-borda)',
        }}
      />
      {errors.titulo && <span className="text-red-500 text-sm">{errors.titulo.message}</span>}

      {/* Campo de conteúdo */}
      <textarea
        {...register('conteudo')}
        placeholder="E aí, o que está rolando?"
        rows={3}
        className="bg-transparent outline-none resize-none transition-colors"
        style={{ color: 'var(--cor-texto)' }}
      />
      {errors.conteudo && <span className="text-red-500 text-sm">{errors.conteudo.message}</span>}

      {/* Preview da imagem */}
      {previewImagem && (
        <div className="relative">
          <img src={previewImagem} alt="preview" className="rounded-lg w-full object-cover max-h-60" />
          <button
            type="button"
            onClick={aoRemoverImagem}
            className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white rounded-full p-1 cursor-pointer"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      )}

      {erroImagem && <span className="text-red-500 text-sm">{erroImagem}</span>}
      {erroAPI && <span className="text-red-500 text-sm">{erroAPI}</span>}

      {/* Rodapé */}
      <div
        className="flex items-center justify-between pt-2 transition-colors"
        style={{ borderTop: '1px solid var(--cor-borda)' }}
      >
        <input ref={inputArquivoRef} type="file" accept="image/*" onChange={aoSelecionarImagem} className="hidden" />
        <button
          type="button"
          onClick={() => inputArquivoRef.current?.click()}
          className="text-blue-400 cursor-pointer hover:text-blue-300 transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        </button>
        <button
          type="submit"
          disabled={isSubmitting}
          className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-full cursor-pointer transition-colors disabled:opacity-50"
        >
          {isSubmitting ? 'Postando...' : 'Postar'}
        </button>
      </div>
    </form>
  )
}