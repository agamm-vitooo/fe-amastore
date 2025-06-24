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
  background: #222;
  color: #fff;
  display: flex;
  flex-direction: column;
  transition: width 0.3s;
  padding: 0.5rem;
}

.sidebar.collapsed {
  width: 60px;
}

.sidebar-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
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
  color: #fff;
  text-decoration: none;
  padding: 0.5rem;
  border-radius: 4px;
}

.sidebar-menu a.active {
  background-color: #0d6efd;
}

.sidebar-toggle {
  background: none;
  border: none;
  color: #fff;
  font-size: 1.25rem;
  cursor: pointer;
  padding: 0.25rem 0.5rem;
  border-radius: 6px;
  transition: background 0.2s ease;
}

.sidebar-toggle:hover {
  background: rgba(255, 255, 255, 0.1);
}
</style>
