import { defineStore } from 'pinia'
import { login } from '../services/AuthService'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: localStorage.getItem('admin_token') || null,
    user: null,
    error: null,
    loading: false,
  }),

  actions: {
    async loginAdmin(email, password) {
      this.loading = true
      this.error = null
      console.log('Login attempt with:', email, password)

      try {
        const response = await login(email, password)
        console.log('Login success:', response.data)

        const { token, admin } = response.data.data 
        this.token = token
        this.user = admin

        localStorage.setItem('admin_token', token)
      } catch (err) {
        console.error('Login error:', err)
        console.error('Backend response:', err.response?.data)
        this.error = err.response?.data?.message || 'Login gagal'
      } finally {
        this.loading = false
      }
    },

    logout() {
      this.token = null
      this.user = null
      localStorage.removeItem('admin_token')
    }
  }
})
