<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useSidebarStore } from '../stores/sidebar'

const sidebar = useSidebarStore()
const isMobile = ref(false)

const updateScreen = () => {
  isMobile.value = window.innerWidth < 768
}

onMounted(() => {
  updateScreen()
  window.addEventListener('resize', updateScreen)
})
onUnmounted(() => {
  window.removeEventListener('resize', updateScreen)
})
</script>

<template>
  <div
    :class="['sidebar', sidebar.collapsed ? 'collapsed' : '', isMobile ? 'mobile' : '']"
  >
    <!-- Header -->
    <div class="sidebar-header">
      <span v-if="!sidebar.collapsed">Admin</span>
        <button class="sidebar-toggle" @click="sidebar.toggle">
          <i :class="sidebar.collapsed ? 'bi-chevron-right' : 'bi-chevron-left'"></i>
        </button>
    </div>

    <!-- Menu -->
    <ul class="sidebar-menu">
      <li>
        <router-link to="/dashboard" exact-active-class="active">
          <i class="bi bi-speedometer2"></i>
          <span v-if="!sidebar.collapsed">Dashboard</span>
        </router-link>
      </li>
      <li>
        <router-link to="/users" exact-active-class="active">
          <i class="bi bi-people"></i>
          <span v-if="!sidebar.collapsed">Users</span>
        </router-link>
      </li>
      <li>
        <router-link to="/products" exact-active-class="active">
          <i class="bi bi-box-seam"></i>
          <span v-if="!sidebar.collapsed">Products</span>
        </router-link>
      </li>
    </ul>
  </div>
</template>

<style scoped>
.sidebar {
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 200px;
  background: #f8f9fa; /* abu muda lembut */
  color: #343a40; /* abu gelap */
  display: flex;
  flex-direction: column;
  transition: width 0.3s;
  padding: 0.5rem;
  border-right: 1px solid #dee2e6;
}

.sidebar.collapsed {
  width: 60px;
}

.sidebar-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
  font-weight: 600;
  font-size: 1.1rem;
  color: #343a40;
}

.sidebar-menu {
  list-style: none;
  padding: 0;
  margin: 0;
}

.sidebar-menu li {
  margin-bottom: 0.5rem;
}

.sidebar-menu a {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #343a40;
  text-decoration: none;
  padding: 0.5rem;
  border-radius: 6px;
  transition: background-color 0.2s ease, color 0.2s ease;
}

.sidebar-menu a:hover {
  background-color: #e2e6ea; /* abu hover */
}

.sidebar-menu a.active {
  background-color: #0d6efd; /* biru modern */
  color: #fff;
}

.sidebar-menu a.active i {
  color: #fff;
}

.sidebar-toggle {
  background: #ced4da; /* tombol toggle abu terang */
  border: none;
  color: #343a40;
  font-size: 1.25rem;
  cursor: pointer;
  padding: 0.25rem 0.5rem;
  border-radius: 6px;
  transition: background 0.2s ease;
}

.sidebar-toggle:hover {
  background: #adb5bd;
}
</style>
