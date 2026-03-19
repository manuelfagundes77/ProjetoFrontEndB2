// Contexto global para gerenciar o estado do usuário logado

import { createContext, useContext, useState } from 'react'
import type { Usuario } from '../types/tipos'

interface ContextoLogadoTipo {
  usuario: Usuario | null
  token: string | null
  aoLogar: (usuario: Usuario, token: string) => void
  aoDeslogar: () => void
  estaLogado: boolean
}

const ContextoLogado = createContext<ContextoLogadoTipo | null>(null)

export function ProvedorLogado({ children }: { children: React.ReactNode }) {
  const [usuario, setUsuario] = useState<Usuario | null>(() => {
    const salvo = localStorage.getItem('usuarioMiniTwitter')
    return salvo ? JSON.parse(salvo) : null
  })

  const [token, setToken] = useState<string | null>(() => {
    return localStorage.getItem('tokenMiniTwitter')
  })

  const aoLogar = (usuario: Usuario, token: string) => {
    setUsuario(usuario)
    setToken(token)
    localStorage.setItem('tokenMiniTwitter', token)
    localStorage.setItem('usuarioMiniTwitter', JSON.stringify(usuario))
  }

  const aoDeslogar = () => {
    setUsuario(null)
    setToken(null)
    localStorage.removeItem('tokenMiniTwitter')
    localStorage.removeItem('usuarioMiniTwitter')
  }

  return (
    <ContextoLogado.Provider value={{ usuario, token, aoLogar, aoDeslogar, estaLogado: !!token }}>
      {children}
    </ContextoLogado.Provider>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export function useContextoLogado() {
  const contexto = useContext(ContextoLogado)
  if (!contexto) throw new Error('useContextoLogado deve ser usado dentro do ProvedorLogado')
  return contexto
}