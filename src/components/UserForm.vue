<!-- UserForm.vue -->
<template>
  <form @submit.prevent="onSubmit" class="row g-2 g-md-3 mb-4">
    <div class="col-12 col-sm-6 col-md-3 mb-2">
      <input v-model="form.name" type="text" class="form-control" placeholder="Nama" required />
    </div>
    <div class="col-12 col-sm-6 col-md-3 mb-2">
      <input v-model="form.email" type="email" class="form-control" placeholder="Email" required />
    </div>
    <div class="col-12 col-sm-6 col-md-2 mb-2">
      <input v-model="form.phone" type="text" class="form-control" placeholder="Telepon" required />
    </div>
    <div class="col-12 col-sm-6 col-md-2 mb-2">
      <input v-model="form.password" type="password" class="form-control" placeholder="Password" required />
    </div>
    <div class="col-12 col-md-2">
      <button type="submit" class="btn btn-primary w-100">Tambah</button>
    </div>
  </form>
</template>

<script setup>
import { ref } from 'vue'
const emit = defineEmits(['create'])
const form = ref({ name: '', email: '', phone: '', password: '' })

const onSubmit = () => {
  emit('create', { ...form.value })
  form.value = { name: '', email: '', phone: '', password: '' }
}
</script>