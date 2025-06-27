<template>
  <div class="container d-flex justify-content-center align-items-center min-vh-100">
    <div class="card shadow p-4 w-100" style="max-width: 1100px;">
      <div class="row g-0 align-items-center">
        <!-- Kiri: SVG -->
        <div class="col-md-6 text-center mb-4 p-4 mb-md-0">
          <img
            src="/undraw_stock-prices_8nuz.svg"
            alt="Login Icon"
            class="img-fluid px-3"
            style="max-height: 500px;"
          />
        </div>

        <!-- Kanan: Form -->
        <div class="col-md-6">
          <h2 class="text-center mb-2">Login Admin</h2>
          <p class="text-center text-muted mb-4">Silakan login untuk mengakses dashboard admin</p>
          <form @submit.prevent="handleLogin">
            <div class="mb-3">
              <label class="form-label">Email</label>
              <input
                v-model="email"
                type="email"
                class="form-control"
                placeholder="Masukkan email"
                required
              />
            </div>
            <div class="mb-3">
              <label class="form-label">Password</label>
              <input
                v-model="password"
                type="password"
                class="form-control"
                placeholder="Masukkan password"
                required
              />
            </div>
            <button type="submit" class="btn btn-primary w-100" :disabled="auth.loading">
              {{ auth.loading ? 'Loading...' : 'Login' }}
            </button>
            <div v-if="auth.error" class="alert alert-danger mt-3">
              {{ auth.error }}
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'
import { showSuccess, showError } from '../utils/swal'

const email = ref('')
const password = ref('')
const router = useRouter()
const auth = useAuthStore()

const handleLogin = async () => {
  await auth.loginAdmin(email.value, password.value)

  if (auth.token) {
    showSuccess('Login berhasil')
    router.push('/dashboard')
  } else if (auth.error) {
    showError('Login gagal', auth.error)
  }
}
</script>
