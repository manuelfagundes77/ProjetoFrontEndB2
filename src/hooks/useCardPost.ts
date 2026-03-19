// src/hooks/useCardPost.ts
// Hook que centraliza toda a lógica do CardPost

import { useState } from 'react'
import type { Post } from '../types/tipos'
import { curtirPost, deletarPost, editarPost } from '../services/posts'

export function useCardPost(post: Post, aoAtualizar: () => void) {
  const [curtindo, setCurtindo] = useState(false)
  
  // Controla o estado visual do like de forma otimista
  const [curtido, setCurtido] = useState(false)
  const [contagemLikes, setContagemLikes] = useState(post.likesCount)

  const [editando, setEditando] = useState(false)
  const [tituloEdicao, setTituloEdicao] = useState(post.title)
  const [conteudoEdicao, setConteudoEdicao] = useState(post.content)
  const [salvando, setSalvando] = useState(false)
  const [erroEdicao, setErroEdicao] = useState('')

  const formatarData = (data: string) => {
    return new Date(data).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    })
  }

  const aoClicarLike = async () => {
    setCurtindo(true)

    // Atualiza o visual imediatamente (otimista)
    const novoCurtido = !curtido
    setCurtido(novoCurtido)
    setContagemLikes((prev) => novoCurtido ? prev + 1 : prev - 1)

    try {
      await curtirPost(post.id)
    } catch {
      // Se falhar reverte o estado visual
      setCurtido(!novoCurtido)
      setContagemLikes((prev) => novoCurtido ? prev - 1 : prev + 1)
    } finally {
      setCurtindo(false)
    }
  }

  const aoClicarDeletar = async () => {
    if (!confirm('Tem certeza que deseja deletar este post?')) return
    await deletarPost(post.id)
    aoAtualizar()
  }

  const aoSalvarEdicao = async () => {
    if (!tituloEdicao.trim() || !conteudoEdicao.trim()) {
      setErroEdicao('Título e conteúdo são obrigatórios')
      return
    }
    setSalvando(true)
    setErroEdicao('')
    try {
      await editarPost(post.id, tituloEdicao, conteudoEdicao)
      setEditando(false)
      aoAtualizar()
    } catch {
      setErroEdicao('Erro ao salvar. Tente novamente.')
    } finally {
      setSalvando(false)
    }
  }

  const aoCancelarEdicao = () => {
    setTituloEdicao(post.title)
    setConteudoEdicao(post.content)
    setErroEdicao('')
    setEditando(false)
  }

  return {
    curtindo, curtido, contagemLikes, aoClicarLike,
    aoClicarDeletar,
    editando, setEditando,
    tituloEdicao, setTituloEdicao,
    conteudoEdicao, setConteudoEdicao,
    salvando, erroEdicao,
    aoSalvarEdicao, aoCancelarEdicao,
    formatarData,
  }
}