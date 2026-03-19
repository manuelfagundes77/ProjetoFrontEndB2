// Serviços de posts
import api from './api'
import type { Post, RespostaPosts } from '../types/tipos'

// Listar posts com paginação e busca
export const listarPosts = async (pagina: number = 1, busca: string = ''): Promise<RespostaPosts> => {
  const { data } = await api.get('/posts', {
    params: {
      page: pagina,
      search: busca,
    },
  })
  return data
}

// Criar post
export const criarPost = async (titulo: string, conteudo: string, imagem?: string): Promise<Post> => {
  const { data } = await api.post('/posts', {
    title: titulo,
    content: conteudo,
    image: imagem,
  })
  return data
}

// Editar post
export const editarPost = async (id: number, titulo: string, conteudo: string, imagem?: string): Promise<Post> => {
  const { data } = await api.put(`/posts/${id}`, {
    title: titulo,
    content: conteudo,
    image: imagem,
  })
  return data
}

// Deletar post
export const deletarPost = async (id: number): Promise<void> => {
  await api.delete(`/posts/${id}`)
}

// Curtir/descurtir post
export const curtirPost = async (id: number): Promise<void> => {
  await api.post(`/posts/${id}/like`)
}