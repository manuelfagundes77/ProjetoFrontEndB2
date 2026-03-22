
// UsuArio autenticado
// POST http://localhost:3000/auth/login
// POST http://localhost:3000/auth/register
export interface Usuario {
  id: number
  name: string
  email: string
}

// Resposta do login
// POST http://localhost:3000/auth/login
export interface RespostaLogin {
  token: string
  user: Usuario
}

// Resposta do cadastro
// POST http://localhost:3000/auth/register
export interface RespostaCadastro {
  id: number
  name: string
  email: string
}

// Post
// GET http://localhost:3000/posts
// POST http://localhost:3000/posts
// PUT http://localhost:3000/posts/:id
// DELETE http://localhost:3000/posts/:id
export interface Post {
  id: number
  title: string
  content: string
  image: string | null
  authorId: number
  authorName: string
  createdAt: string
  likesCount: number
}

// Resposta da listagem de posts
// GET http://localhost:3000/posts
export interface RespostaPosts {
  posts: Post[]
  total: number
  page: number
  limit: number
}

// Erro da API (400, 401, 403)
export interface ErroAPI {
  error: string
  message?: string
  details?: {
    field: string
    message: string
  }[]
}