// Base URL: http://localhost:3000

import axios from 'axios'

const api = axios.create({
  baseURL: 'http://localhost:3000',
  headers: {
    'Content-Type': 'application/json',
  },
})

// Interceptor — adiciona o token automaticamente em toda requisicao
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('tokenMiniTwitter')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

export default api