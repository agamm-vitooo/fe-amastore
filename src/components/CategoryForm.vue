<template>
  <form @submit.prevent="handleSubmit" class="card p-4 mb-4 shadow-sm">
    <h5 class="mb-3">Tambah Kategori</h5>

    <div class="mb-3">
      <label class="form-label">Nama Kategori</label>
      <input v-model="form.name" class="form-control" required />
    </div>

    <button type="submit" class="btn btn-primary">Simpan Kategori</button>
  </form>
</template>

<script setup>
import { ref, defineEmits } from 'vue'
import { showSuccess, showError } from '../utils/swal'
import { createCategory } from '../services/CategoryService'

const emit = defineEmits(['category-added'])

const form = ref({
  name: ''
})

const handleSubmit = async () => {
  try {
    await createCategory(form.value)
    showSuccess('Kategori berhasil ditambahkan')
    emit('category-added')
    form.value.name = ''
  } catch (err) {
    showError('Gagal menambahkan kategori')
    console.error(err)
  }
}
</script>

