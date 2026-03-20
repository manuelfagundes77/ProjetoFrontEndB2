// src/main.tsx
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ProvedorLogado } from './ContextAPI/ContextoLogado'
import { ProvedorTema } from './ContextAPI/ContextoTema'
import './index.css'
import App from './App.tsx'

const queryClient = new QueryClient()

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <ProvedorTema>
          <ProvedorLogado>
            <App />
          </ProvedorLogado>
        </ProvedorTema>
      </QueryClientProvider>
    </BrowserRouter>
  </StrictMode>,
)