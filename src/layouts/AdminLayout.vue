<script setup>
import Sidebar from '../components/Sidebar.vue'
import Header from '../components/Header.vue'
import { useSidebarStore } from '../stores/sidebar'

const sidebar = useSidebarStore()
</script>

<template>
  <div class="d-flex">
    <Sidebar />

    <div class="flex-grow-1" :style="{ marginLeft: sidebar.collapsed ? '70px' : '220px', transition: 'margin 0.3s' }">
      <Header />
      <main class="p-4">
        <router-view />
      </main>
    </div>
  </div>
</template>
