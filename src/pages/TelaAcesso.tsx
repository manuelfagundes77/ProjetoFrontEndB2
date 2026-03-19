import { useState } from 'react'
import FormularioLogin from '../components/FormularioLogin'
import FormularioCadastro from '../components/FormularioCadastro'
import { useNavigate } from 'react-router-dom'

type Aba = 'login' | 'cadastro'

export default function TelaAcesso() {
  const [abaAtiva, setAbaAtiva] = useState<Aba>('login')
  const navigate = useNavigate()

  const aoAutenticar = () => {
    console.log('logou com sucesso!')
    navigate('/feed')
  }

  return (
    <div className="min-h-screen bg-[#0d1117] flex flex-col items-center justify-center px-4">
      
      {/* Título */}
      <h1 className="text-4xl font-bold text-white mb-10">Mini Twitter</h1>

      {/* Card */}
      <div className="w-full max-w-lg">

        {/* Abas */}
        <div className="flex mb-8">
          <button
            onClick={() => setAbaAtiva('login')}
            className={`flex-1 pb-3 text-center font-semibold cursor-pointer border-b-2 transition-colors ${
              abaAtiva === 'login'
                ? 'text-white border-blue-500'
                : 'text-gray-400 border-gray-700'
            }`}
          >
            Login
          </button>
          <button
            onClick={() => setAbaAtiva('cadastro')}
            className={`flex-1 pb-3 text-center font-semibold cursor-pointer border-b-2 transition-colors ${
              abaAtiva === 'cadastro'
                ? 'text-white border-blue-500'
                : 'text-gray-400 border-gray-700'
            }`}
          >
            Cadastrar
          </button>
        </div>

        {/* Formulário */}
        {abaAtiva === 'login' ? (
          <FormularioLogin aoLogar={aoAutenticar} />
        ) : (
          <FormularioCadastro aoCadastrar={aoAutenticar} />
        )}

        {/* Rodapé */}
        <p className="text-gray-500 text-sm text-center mt-6">
          Ao clicar em continuar, você concorda com nossos{' '}
          <span className="underline cursor-pointer">Termos de Serviço</span> e{' '}
          <span className="underline cursor-pointer">Política de Privacidade</span>.
        </p>
      </div>
    </div>
  )
}