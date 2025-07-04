<template>
  <div class="container mt-2">
    <h2 class="mb-2 text-center text-md-start">Halo, {{ auth.user?.name || 'User' }}!</h2>
    <p class="lead text-center text-md-start">Selamat datang di dashboard admin.</p>

    <div class="row">
      <div class="col-12 col-md-6 mb-4">
        <div class="card shadow-sm h-100">
          <div class="card-body">
            <UserChart />
          </div>
        </div>
      </div>
      <div class="col-12 col-md-6 mb-4">
        <div class="card shadow-sm h-100">
          <div class="card-body">
            <ProductStat />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useAuthStore } from '../stores/auth'
import { useRouter } from 'vue-router'
import { onMounted } from 'vue'
import axios from 'axios'
import UserChart from '../components/UserChart.vue'
import ProductStat from '../components/ProductChart.vue'

const auth = useAuthStore()
const router = useRouter()

onMounted(async () => {
  if (!auth.token) return router.push('/login')

  if (!auth.user) {
    try {
      const res = await axios.get('http://localhost:3000/profile', {
        headers: { Authorization: `Bearer ${auth.token}` },
      })
      auth.setUser(res.data.data)
    } catch {
      auth.logout()
      router.push('/login')
    }
  }
})

const logout = () => {
  auth.logout()
  router.push('/login')
}
</script>

<style>
@media (min-width: 768px) {
  .main-content {
    margin-left: 220px;
    transition: margin-left 0.3s;
  }

  .sidebar-collapsed + .main-content {
    margin-left: 70px;
  }
}

@media (max-width: 767px) {
  .main-content {
    margin-left: 0 !important;
  }
}
</style>