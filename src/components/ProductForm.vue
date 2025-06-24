<template>
  <form @submit.prevent="handleSubmit" class="card p-4 mb-4 shadow-sm">
    <h5 class="mb-3">Tambah Produk</h5>

    <div class="mb-3">
      <label class="form-label">Nama Produk</label>
      <input v-model="form.name" class="form-control" required />
    </div>

    <div class="mb-3">
      <label class="form-label">Deskripsi</label>
      <textarea v-model="form.description" class="form-control" required />
    </div>

    <div class="mb-3">
      <label class="form-label">Gambar Produk</label>
      <input type="file" @change="handleFileChange" class="form-control" accept="image/*" required />
    </div>

    <div class="mb-3">
      <label class="form-label">Kategori</label>
      <select v-model="form.category_id" class="form-select" required>
        <option disabled value="">Pilih Kategori</option>
        <option v-for="cat in categories" :key="cat._id" :value="cat._id">
          {{ cat.name }}
        </option>
      </select>
    </div>

    <button type="submit" class="btn btn-primary">Simpan Produk</button>
  </form>
</template>

<script setup>
import { ref, onMounted, defineEmits } from 'vue'
import { showSuccess, showError } from '../utils/swal'
import { getAllCategories } from '../services/CategoryService'
import { createProduct } from '../services/ProductService'
import { uploadProductImage } from '../services/UploadService'

const emit = defineEmits(['product-added'])

const form = ref({
  name: '',
  description: '',
  image_url: '',
  category_id: ''
})

const imageFile = ref(null)
const categories = ref([])

const fetchCategories = async () => {
  try {
    const res = await getAllCategories()
    categories.value = res
  } catch {
    showError('Gagal memuat kategori')
  }
}

const handleFileChange = (e) => {
  imageFile.value = e.target.files[0]
}

const handleSubmit = async () => {
  try {
    const imageUrl = await uploadProductImage(imageFile.value)
    form.value.image_url = imageUrl

    await createProduct(form.value)

    showSuccess('Produk berhasil ditambahkan')
    emit('product-added')

    form.value = { name: '', description: '', image_url: '', category_id: '' }
    imageFile.value = null
  } catch (err) {
    showError(err.message || 'Gagal menyimpan produk')
    console.error(err)
  }
}

onMounted(fetchCategories)
</script>
