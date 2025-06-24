<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { getAllProducts, deleteProduct } from '../services/ProductService'
import { showError, showSuccess, showConfirm } from '../utils/swal'
import ProductForm from '../components/ProductForm.vue'
import ProductList from '../components/ProductList.vue'
import CategoryForm from '../components/CategoryForm.vue'

const products = ref([])
const showProductForm = ref(false)
const showCategoryForm = ref(false)
const editedProduct = ref(null)

const page = ref(1)
const limit = 10
const isLoading = ref(false)
const isEnd = ref(false)

const fetchProducts = async () => {
  if (isLoading.value || isEnd.value) return
  isLoading.value = true

  try {
    const fetched = await getAllProducts(page.value, limit)
    products.value.push(...fetched)

    if (fetched.length < limit) isEnd.value = true
    page.value++
  } catch (err) {
    showError('Gagal memuat produk')
    console.error(err)
  } finally {
    isLoading.value = false
  }
}

const handleDelete = async (id) => {
  const confirmed = await showConfirm('Yakin ingin hapus produk ini?')
  if (!confirmed) return
  try {
    await deleteProduct(id)
    showSuccess('Produk berhasil dihapus')
    products.value = []
    page.value = 1
    isEnd.value = false
    fetchProducts()
  } catch {
    showError('Gagal menghapus produk')
  }
}

const handleEdit = (product) => {
  editedProduct.value = { ...product }
  showProductForm.value = true
}

const onProductAddedOrUpdated = () => {
  showProductForm.value = false
  editedProduct.value = null
  products.value = []
  page.value = 1
  isEnd.value = false
  fetchProducts()
}

const onCategoryAdded = () => {
  showCategoryForm.value = false
}

const handleScroll = () => {
  const nearBottom = window.innerHeight + window.scrollY >= document.body.offsetHeight - 200
  if (nearBottom) fetchProducts()
}

onMounted(() => {
  fetchProducts()
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<template>
  <div class="container mt-4">
    <div class="d-flex gap-2 mb-3">
      <button class="btn btn-primary" @click="showProductForm = !showProductForm">
        {{ showProductForm ? 'Tutup Form Produk' : 'Tambah Produk' }}
      </button>
      <button class="btn btn-secondary" @click="showCategoryForm = !showCategoryForm">
        {{ showCategoryForm ? 'Tutup Form Kategori' : 'Tambah Kategori' }}
      </button>
    </div>

    <ProductForm
      v-if="showProductForm"
      :initialData="editedProduct"
      @product-added="onProductAddedOrUpdated"
      @product-updated="onProductAddedOrUpdated"
    />
    <CategoryForm v-if="showCategoryForm" @category-added="onCategoryAdded" />
    <ProductList
      :products="products"
      @delete="handleDelete"
      @edit="handleEdit"
      @product-updated="fetchProducts"
    />
    
    <div v-if="isLoading" class="text-center my-3">
      <div class="spinner-border" role="status"></div>
    </div>
    <div v-if="isEnd" class="text-muted text-center my-4">Semua produk telah dimuat.</div>
  </div>
</template>
