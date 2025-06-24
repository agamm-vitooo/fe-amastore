<script setup>
import { useAuthStore } from '../stores/auth'
import { showSuccess } from '../utils/swal'

const auth = useAuthStore()

const handleLogout = () => {
  auth.logout()
  showSuccess('Logout berhasil')
  router.push('/login')
}
</script>

<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-white border-bottom px-3">
    <div class="container-fluid">
      <span class="navbar-brand fw-bold">Dashboard</span>

      <div class="d-flex align-items-center ms-auto">
        <span class="me-3 text-muted small">👤 {{ auth.user?.name || 'Admin' }}</span>
        <button class="btn btn-sm btn-outline-danger" @click="handleLogout">Logout</button>
      </div>
    </div>
  </nav>
</template>
