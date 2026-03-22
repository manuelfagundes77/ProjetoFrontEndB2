// Contexto global para gerenciar o tema dark/light

import { createContext, useContext, useState, useEffect } from 'react'

interface ContextoTemaTipo {
  temaDark: boolean
  alternarTema: () => void
}

const ContextoTema = createContext<ContextoTemaTipo | null>(null)

export function ProvedorTema({ children }: { children: React.ReactNode }) {
  // Inicializa lendo do localStorage — padrão e dark
  const [temaDark, setTemaDark] = useState<boolean>(() => {
    const salvo = localStorage.getItem('temaMiniTwitter')
    return salvo ? salvo === 'dark' : true
  })

  
  useEffect(() => {
    if (temaDark) {
      document.documentElement.classList.remove('light')
    } else {
      document.documentElement.classList.add('light')
    }
    localStorage.setItem('temaMiniTwitter', temaDark ? 'dark' : 'light')
  }, [temaDark])

  const alternarTema = () => setTemaDark((prev) => !prev)

  return (
    <ContextoTema.Provider value={{ temaDark, alternarTema }}>
      {children}
    </ContextoTema.Provider>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export function useContextoTema() {
  const contexto = useContext(ContextoTema)
  if (!contexto) throw new Error('useContextoTema')
  return contexto
}