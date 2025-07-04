// src/main.js
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-icons/font/bootstrap-icons.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import { createPinia } from 'pinia'
import Swal from 'sweetalert2'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.mount('#app')
app.config.globalProperties.$swal = Swal
