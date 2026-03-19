import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import axios from 'axios'
import { cadastrar } from '../services/autenticacao'

const esquemaCadastro = z.object({
  nome: z.string().min(4, 'Nome deve ter no mínimo 4 caracteres'),
  email: z.string().email('E-mail inválido'),
  senha: z.string().min(4, 'Senha deve ter no mínimo 4 caracteres'),
})

type DadosCadastro = z.infer<typeof esquemaCadastro>

interface Props {
  aoCadastrar: () => void
}

export default function FormularioCadastro({ aoCadastrar }: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<DadosCadastro>({
    resolver: zodResolver(esquemaCadastro),
  })

  const [erroAPI, setErroAPI] = useState('')

  const aoEnviar = async (dados: DadosCadastro) => {
    try {
      setErroAPI('')
      await cadastrar(dados.nome, dados.email, dados.senha)
      aoCadastrar()
    } catch (erro) {
      if (axios.isAxiosError(erro)) {
        setErroAPI(erro.response?.data?.error || 'Erro ao cadastrar')
      } else {
        setErroAPI('Erro ao cadastrar')
      }
    }
  }

  return (
    <form onSubmit={handleSubmit(aoEnviar)} className="flex flex-col gap-4">
      <h2 className="text-2xl font-bold text-white">Olá, vamos começar!</h2>
      <p className="text-gray-400">Por favor, insira os dados solicitados para fazer cadastro.</p>

      <div className="flex flex-col gap-1">
        <label className="text-white text-sm">Nome</label>
        <input
          {...register('nome')}
          type="text"
          placeholder="Insira o seu nome"
          className="bg-[#1e2a3a] text-white rounded-lg px-4 py-3 outline-none border border-transparent focus:border-blue-500"
        />
        {errors.nome && <span className="text-red-500 text-sm">{errors.nome.message}</span>}
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-white text-sm">E-mail</label>
        <input
          {...register('email')}
          type="email"
          placeholder="Insira o seu e-mail"
          className="bg-[#1e2a3a] text-white rounded-lg px-4 py-3 outline-none border border-transparent focus:border-blue-500"
        />
        {errors.email && <span className="text-red-500 text-sm">{errors.email.message}</span>}
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-white text-sm">Senha</label>
        <input
          {...register('senha')}
          type="password"
          placeholder="Insira a sua senha"
          className="bg-[#1e2a3a] text-white rounded-lg px-4 py-3 outline-none border border-transparent focus:border-blue-500"
        />
        {errors.senha && <span className="text-red-500 text-sm">{errors.senha.message}</span>}
      </div>

      {erroAPI && <span className="text-red-500 text-sm text-center">{erroAPI}</span>}

      <button
        type="submit"
        disabled={isSubmitting}
        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 rounded-full transition-colors disabled:opacity-50"
      >
        {isSubmitting ? 'Cadastrando...' : 'Continuar'}
      </button>
    </form>
  )
}