// src/components/FormularioLogin.tsx
// Formulário de login usando React Hook Form + Zod
// POST http://localhost:3000/auth/login

import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { login } from '../services/autenticacao'
import { useState } from 'react'
import axios from 'axios'
import { useContextoLogado } from '../ContextAPI/ContextoLogado'

const esquemaLogin = z.object({
  email: z.string().email('E-mail inválido'),
  senha: z.string().min(4, 'Senha deve ter no mínimo 4 caracteres'),
})

type DadosLogin = z.infer<typeof esquemaLogin>

interface Props {
  aoLogar: () => void
}

export default function FormularioLogin({ aoLogar }: Props) {
  const { aoLogar: aoLogarContexto } = useContextoLogado()

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<DadosLogin>({
    resolver: zodResolver(esquemaLogin),
  })

  const [erroAPI, setErroAPI] = useState('')

  const aoEnviar = async (dados: DadosLogin) => {
    try {
      setErroAPI('')
      const resposta = await login(dados.email, dados.senha)
      aoLogarContexto(resposta.user, resposta.token)
      aoLogar()
    } catch (erro) {
      if (axios.isAxiosError(erro)) {
        setErroAPI(erro.response?.data?.error || 'Erro ao fazer login')
      } else {
        setErroAPI('Erro ao fazer login')
      }
    }
  }

  return (
    <form onSubmit={handleSubmit(aoEnviar)} className="flex flex-col gap-4">
      <h2 className="text-2xl font-bold transition-colors" style={{ color: 'var(--cor-texto)' }}>
        Olá, de novo!
      </h2>
      <p className="transition-colors" style={{ color: 'var(--cor-texto-suave)' }}>
        Por favor, insira os seus dados para fazer login.
      </p>

      <div className="flex flex-col gap-1">
        <label className="text-sm transition-colors" style={{ color: 'var(--cor-texto)' }}>E-mail</label>
        <input
          {...register('email')}
          type="email"
          placeholder="Insira o seu e-mail"
          className="rounded-lg px-4 py-3 outline-none border border-transparent focus:border-blue-500 transition-colors"
          style={{ backgroundColor: 'var(--cor-card)', color: 'var(--cor-texto)' }}
        />
        {errors.email && <span className="text-red-500 text-sm">{errors.email.message}</span>}
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-sm transition-colors" style={{ color: 'var(--cor-texto)' }}>Senha</label>
        <input
          {...register('senha')}
          type="password"
          placeholder="Insira a sua senha"
          className="rounded-lg px-4 py-3 outline-none border border-transparent focus:border-blue-500 transition-colors"
          style={{ backgroundColor: 'var(--cor-card)', color: 'var(--cor-texto)' }}
        />
        {errors.senha && <span className="text-red-500 text-sm">{errors.senha.message}</span>}
      </div>

      {erroAPI && <span className="text-red-500 text-sm text-center">{erroAPI}</span>}

      <button
        type="submit"
        disabled={isSubmitting}
        className="bg-blue-500 hover:bg-blue-600 cursor-pointer text-white font-bold py-3 rounded-full transition-colors disabled:opacity-50"
      >
        {isSubmitting ? 'Entrando...' : 'Continuar'}
      </button>
    </form>
  )
}