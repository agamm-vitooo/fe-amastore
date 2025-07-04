<template>
  <form @submit.prevent="onSubmit" class="mb-4">
    <div class="mb-3">
      <label class="form-label">Nama Produk</label>
      <input v-model="form.name" type="text" class="form-control" required />
    </div>

    <div class="mb-3">
      <label class="form-label">Deskripsi</label>
      <textarea v-model="form.description" class="form-control" rows="2"></textarea>
    </div>

    <div class="mb-3">
      <label class="form-label">URL Gambar</label>
      <input v-model="form.image_url" type="text" class="form-control" />
    </div>

    <div class="mb-3">
      <label class="form-label">Kategori</label>
      <select v-model="form.category_id" class="form-select">
        <option disabled value="">Pilih Kategori</option>
        <option v-for="cat in categories" :key="cat._id" :value="cat._id">
          {{ cat.name }}
        </option>
      </select>
    </div>

    <div class="form-check mb-3">
      <input class="form-check-input" type="checkbox" v-model="form.is_active" />
      <label class="form-check-label">Aktif</label>
    </div>

    <button type="submit" class="btn btn-primary">
      {{ form._id ? 'Update' : 'Tambah' }}
    </button>
  </form>
</template>

<script setup>
import { reactive, watch } from 'vue'
import { createProduct, updateProduct } from '../services/ProductService'

const props = defineProps(['initialData', 'categories'])
const emit = defineEmits(['saved'])

const form = reactive({ ...props.initialData })

watch(() => props.initialData, (val) => Object.assign(form, val))

const onSubmit = async () => {
  if (form._id) {
    await updateProduct(form._id, form)
  } else {
    await createProduct(form)
  }
  emit('saved')
}
</script>
