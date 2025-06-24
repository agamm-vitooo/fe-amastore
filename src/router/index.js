// src/router/index.js

import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '../stores/auth'
import LoginPage from '../views/LoginPage.vue'
import DashboardPage from '../views/DashboardPage.vue'
import AdminLayout from '../layouts/AdminLayout.vue'
import Users from '../views/Users.vue'
import ProductsPage from '../views/ProductsPage.vue'

const routes = [
  { path: '/', redirect: '/login' },
  { path: '/login', component: LoginPage },
  { path: '/dashboard', component: AdminLayout,
    children: [
      { path: '', component: DashboardPage },
      { path : '/users', component: Users },
      { path : '/products', component: ProductsPage },
    ]
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// ✅ Global navigation guard
router.beforeEach((to, from, next) => {
  const auth = useAuthStore()
  const isAuth = !!auth.token

  if (to.path.startsWith('/dashboard') && !isAuth) {
    next('/login')
  } else if (to.path === '/login' && isAuth) {
    next('/dashboard')
  } else {
    next()
  }
})

export default router
