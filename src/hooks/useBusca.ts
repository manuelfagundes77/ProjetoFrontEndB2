// Hook personalizado para busca com debounce

import { useState, useEffect } from 'react'

export function useBusca(delay: number = 500) {
  const [termoBusca, setTermoBusca] = useState('')
  const [termoDebounce, setTermoDebounce] = useState('')

  useEffect(() => {
    const timer = setTimeout(() => {
      setTermoDebounce(termoBusca)
    }, delay)

    return () => clearTimeout(timer)
  }, [termoBusca, delay])

  return { termoBusca, setTermoBusca, termoDebounce }
}