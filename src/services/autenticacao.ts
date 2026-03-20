
import api from './api'
import type { RespostaLogin, RespostaCadastro } from '../types/tipos'

// Cadastro de novo usuário
export const cadastrar = async (nome: string, email: string, senha: string): Promise<RespostaCadastro> => {
  const { data } = await api.post('/auth/register', {
    name: nome,
    email,
    password: senha,
  })
  return data
}

// Login de usuário
export const login = async (email: string, senha: string): Promise<RespostaLogin> => {
  const { data } = await api.post('/auth/login', { email, password: senha })
  return data
}

// Logout de usuário
export const logout = async (): Promise<void> => {
  await api.post('/auth/logout')
}