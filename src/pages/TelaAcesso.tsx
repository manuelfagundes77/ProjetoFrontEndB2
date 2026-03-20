// src/pages/TelaAcesso.tsx

import { useState } from 'react'
import FormularioLogin from '../components/FormularioLogin'
import FormularioCadastro from '../components/FormularioCadastro'
import { useNavigate } from 'react-router-dom'
import { useQueryClient } from '@tanstack/react-query'
import BotaoTema from '../components/layout/BotaoTema'

type Aba = 'login' | 'cadastro'

export default function TelaAcesso() {
  const [abaAtiva, setAbaAtiva] = useState<Aba>('login')
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  const aoAutenticar = () => {
    queryClient.invalidateQueries({ queryKey: ['posts'] })
    navigate('/feed')
  }

  const aoFinalizarCadastro = () => {
    setAbaAtiva('login')
  }

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center px-4 transition-colors duration-300"
      style={{ backgroundColor: 'var(--cor-fundo)' }}
    >
      {/* Botão de tema — canto superior direito */}
      <div className="fixed top-4 right-4">
        <BotaoTema />
      </div>

      {/* Título */}
      <h1 className="text-4xl font-bold mb-10" style={{ color: 'var(--cor-texto)' }}>
        Mini Twitter
      </h1>

      {/* Card */}
      <div className="w-full max-w-lg">

        {/* Abas */}
        <div className="flex mb-8">
          <button
            onClick={() => setAbaAtiva('login')}
            className={`flex-1 pb-3 text-center font-semibold cursor-pointer border-b-2 transition-colors ${
              abaAtiva === 'login' ? 'border-blue-500' : 'border-gray-700'
            }`}
            style={{ color: abaAtiva === 'login' ? 'var(--cor-texto)' : 'var(--cor-texto-suave)' }}
          >
            Login
          </button>
          <button
            onClick={() => setAbaAtiva('cadastro')}
            className={`flex-1 pb-3 text-center font-semibold cursor-pointer border-b-2 transition-colors ${
              abaAtiva === 'cadastro' ? 'border-blue-500' : 'border-gray-700'
            }`}
            style={{ color: abaAtiva === 'cadastro' ? 'var(--cor-texto)' : 'var(--cor-texto-suave)' }}
          >
            Cadastrar
          </button>
        </div>

        {/* Formulário */}
        {abaAtiva === 'login' ? (
          <FormularioLogin aoLogar={aoAutenticar} />
        ) : (
          <FormularioCadastro aoCadastrar={aoFinalizarCadastro} />
        )}

        {/* Rodapé */}
        <p className="text-sm text-center mt-6" style={{ color: 'var(--cor-texto-muted)' }}>
          Ao clicar em continuar, você concorda com nossos{' '}
          <span className="underline cursor-pointer">Termos de Serviço</span> e{' '}
          <span className="underline cursor-pointer">Política de Privacidade</span>.
        </p>
      </div>
    </div>
  )
}