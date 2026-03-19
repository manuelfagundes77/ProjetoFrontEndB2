import { useQuery } from '@tanstack/react-query'
import { listarPosts } from '../services/posts'
// Hook personalizado usando TanStack Query para buscar posts
// GET http://localhost:3000/posts

export function usePosts(pagina: number = 1, busca: string = '') {
  return useQuery({
    queryKey: ['posts', pagina, busca],
    queryFn: () => listarPosts(pagina, busca),
  })
}