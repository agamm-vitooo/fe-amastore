<template>
  <div>
    <h4 class="mt-5">Daftar Produk</h4>
    <table class="table table-bordered table-striped mt-3">
      <thead class="table-light">
        <tr>
          <th>Nama</th>
          <th>Kategori</th>
          <th>Deskripsi</th>
          <th>Gambar</th>
          <th>Status</th>
          <th>Dibuat</th>
          <th>Aksi</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="product in products" :key="product._id">
          <td>
            <input v-if="isEditing(product._id)" v-model="editCache[product._id].name" class="form-control form-control-sm" />
            <span v-else>{{ product.name }}</span>
          </td>

          <td>{{ product.category_id.name }}</td>

          <td>
            <textarea v-if="isEditing(product._id)" v-model="editCache[product._id].description" class="form-control form-control-sm" />
            <span v-else>{{ product.description }}</span>
          </td>

          <td><img :src="product.image_url" alt="img" width="60" /></td>

          <td>
            <select v-if="isEditing(product._id)" v-model="editCache[product._id].is_active" class="form-select form-select-sm">
              <option :value="true">Aktif</option>
              <option :value="false">Nonaktif</option>
            </select>
            <span v-else class="badge" :class="product.is_active ? 'bg-success' : 'bg-secondary'">
              {{ product.is_active ? 'Aktif' : 'Nonaktif' }}
            </span>
          </td>

          <td>{{ new Date(product.createdAt).toLocaleDateString() }}</td>

          <td>
            <div v-if="isEditing(product._id)">
              <button class="btn btn-sm btn-success me-1" @click="saveEdit(product._id)">Simpan</button>
              <button class="btn btn-sm btn-secondary" @click="cancelEdit(product._id)">Batal</button>
            </div>
            <div v-else>
              <button class="btn btn-sm btn-primary me-2" @click="startEdit(product)">Edit</button>
              <button class="btn btn-sm btn-danger" @click="$emit('delete', product._id)">Hapus</button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>

    <div v-if="products.length === 0" class="text-muted text-center">Tidak ada produk.</div>
  </div>
</template>

<script setup>
import { reactive } from 'vue'
import { updateProduct } from '../services/ProductService'
import { showError, showSuccess } from '../utils/swal'

const props = defineProps({
  products: Array
})

const emit = defineEmits(['delete', 'edit', 'product-updated'])

const editingId = reactive(new Set()) // menandai product yang sedang diedit
const editCache = reactive({}) // menyimpan salinan data sementara

const isEditing = (id) => editingId.has(id)

const startEdit = (product) => {
  editingId.add(product._id)
  editCache[product._id] = { ...product } // deep copy
}

const cancelEdit = (id) => {
  editingId.delete(id)
  delete editCache[id]
}

const saveEdit = async (id) => {
  try {
    const updated = editCache[id]
    await updateProduct(id, updated)
    showSuccess('Produk berhasil diperbarui')
    editingId.delete(id)
    delete editCache[id]
    emit('product-updated') // beri tahu parent untuk refresh data
  } catch (err) {
    showError('Gagal memperbarui produk')
    console.error(err)
  }
}
</script>
