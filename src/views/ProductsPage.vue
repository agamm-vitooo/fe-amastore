<script setup>
import { ref, onMounted } from 'vue'
import { Modal } from 'bootstrap'

import UnifiedModal from '../components/Modal.vue'
import ProductList from '../components/ProductList.vue'

import { getAllProducts, deleteProduct } from '../services/ProductService'
import { getAllCategories } from '../services/CategoryService'

const products = ref([])
const categories = ref([])
const formData = ref({})
const modalMode = ref('product') // 'product' atau 'category'

// Fetch Produk dan Kategori
const fetchProducts = async () => {
  const data = await getAllProducts()
  products.value = data
  formData.value = {}
}

const fetchCategories = async () => {
  const data = await getAllCategories()
  categories.value = data
}

// Tampilkan Modal Tambah Produk
const openAddProduct = () => {
  formData.value = {}
  modalMode.value = 'product'
  showModal()
}

// Tampilkan Modal Tambah Kategori
const openAddCategory = () => {
  formData.value = {}
  modalMode.value = 'category'
  showModal()
}

// Edit Produk
const setEdit = (product) => {
  formData.value = { ...product }
  modalMode.value = 'product'
  showModal()
}

// Tampilkan Modal Bootstrap
const showModal = () => {
  const el = document.getElementById('unifiedModal')
  const modal = Modal.getOrCreateInstance(el)
  modal.show()
}

// Hapus Produk
const deleteProductById = async (id) => {
  if (confirm('Yakin ingin menghapus produk ini?')) {
    await deleteProduct(id)
    fetchProducts()
  }
}

// Handler saat modal disimpan
const onSaved = () => {
  if (modalMode.value === 'product') fetchProducts()
  else fetchCategories()
}

// Handler ganti mode di dalam modal (dari produk ke kategori)
const handleSwitchMode = (mode) => {
  modalMode.value = mode
  formData.value = {}
  showModal()
}

// Load data saat halaman dimuat
onMounted(() => {
  fetchProducts()
  fetchCategories()
})
</script>

<template>
  <div class="container py-4">
    <!-- Header -->
    <div class="d-flex justify-content-between align-items-center mb-4">
      <h2 class="mb-0">Manajemen Produk</h2>
      <div>
        <button class="btn btn-success me-2" @click="openAddProduct">+ Tambah Produk</button>
        <button class="btn btn-outline-primary" @click="openAddCategory">+ Tambah Kategori</button>
      </div>
    </div>

    <!-- Modal Gabungan Produk & Kategori -->
    <UnifiedModal
      :initialData="formData"
      :mode="modalMode"
      :categories="categories"
      @saved="onSaved"
      @switchMode="handleSwitchMode"
    />

    <!-- List Produk -->
    <ProductList
      :products="products"
      @edit="setEdit"
      @delete="deleteProductById"
    />
  </div>
</template>
