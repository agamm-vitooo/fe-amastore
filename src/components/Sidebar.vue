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
      <div class="logo-wrapper" :class="{ 'centered': sidebar.collapsed }">
        <img src="/amastore.jpg" alt="Logo" class="logo-img" />
        <span v-if="!sidebar.collapsed" class="logo-text">Admin</span>
      </div>
      <button
        class="sidebar-toggle"
        @click="sidebar.toggle"
      >
        <i :class="sidebar.collapsed ? 'bi-chevron-right' : 'bi-chevron-left'"></i>
      </button>
    </div>

    <!-- Menu -->
    <nav class="sidebar-nav">
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
    </nav>
  </div>
</template>

<style scoped>
.sidebar {
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 250px;
  background: #ffffff;
  color: #374151;
  display: flex;
  flex-direction: column;
  transition: width 0.3s ease;
  border-right: 1px solid #e5e7eb;
  z-index: 1000;
}

.sidebar.collapsed {
  width: 70px;
}

/* Header */
.sidebar-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.5rem 1rem;
  border-bottom: 1px solid #f3f4f6;
  background: #f9fafb;
}

.logo-wrapper {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  flex: 1;
}

.logo-wrapper.centered {
  justify-content: center;
}

.logo-img {
  height: 32px;
  width: 32px;
  object-fit: cover;
  border-radius: 8px;
  border: 2px solid #3b82f6;
}

.logo-text {
  font-size: 1.125rem;
  font-weight: 700;
  color: #1f2937;
}

.sidebar-toggle {
  background: #f3f4f6;
  border: 1px solid #e5e7eb;
  color: #6b7280;
  font-size: 1rem;
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 6px;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
}

.sidebar-toggle:hover {
  background: #e5e7eb;
  color: #374151;
}

/* Navigation */
.sidebar-nav {
  flex: 1;
  padding: 1rem 0;
}

.sidebar-menu {
  list-style: none;
  padding: 0;
  margin: 0;
}

.sidebar-menu li {
  margin-bottom: 0.25rem;
}

.sidebar-menu a {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  color: #6b7280;
  text-decoration: none;
  padding: 0.75rem 1rem;
  margin: 0 0.75rem;
  border-radius: 8px;
  transition: all 0.2s ease;
  font-weight: 500;
  font-size: 0.875rem;
}

.sidebar-menu a:hover {
  background: #f3f4f6;
  color: #374151;
}

.sidebar-menu a.active {
  background: #3b82f6;
  color: #ffffff;
}

.sidebar-menu a i {
  font-size: 1.125rem;
  min-width: 20px;
  text-align: center;
}

/* Mobile responsive */
@media (max-width: 768px) {
  .sidebar {
    transform: translateX(-100%);
  }
  
  .sidebar:not(.collapsed) {
    transform: translateX(0);
    width: 100%;
  }
}
/* Geser tombol toggle ke kanan saat sidebar collapsed */
.sidebar.collapsed .sidebar-toggle {
  margin-left: auto;
  margin-right: 0.25rem;
}

</style>