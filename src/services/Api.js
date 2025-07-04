import axios from 'axios'

// baseURL bisa pakai .env juga biar gampang diganti
const api = axios.create({
  baseURL: 'http://localhost:3000/api'
})

// Interceptor untuk nambah token otomatis
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('admin_token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

export default api
