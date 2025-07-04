<template>
  <div class="modal fade" ref="modalRef" id="productModal" tabindex="-1" aria-labelledby="productModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-lg">
      <form class="modal-content" @submit.prevent="onSubmit">
        <div class="modal-header">
          <h5 class="modal-title" id="productModalLabel">
            {{ form._id ? 'Edit Produk' : 'Tambah Produk' }}
          </h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>

        <div class="modal-body">
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
        </div>

        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Batal</button>
          <button type="submit" class="btn btn-primary">{{ form._id ? 'Update' : 'Tambah' }}</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, watch, nextTick } from 'vue'
import { createProduct, updateProduct } from '../services/ProductService'
import { showSuccess, showError } from '../utils/swal'

const props = defineProps(['initialData', 'categories'])
const emit = defineEmits(['saved'])

const form = reactive({ ...props.initialData })
const modalRef = ref(null)

watch(() => props.initialData, (val) => Object.assign(form, val))

const onSubmit = async () => {
  try {
    if (form._id) {
      await updateProduct(form._id, form)
      showSuccess('Produk berhasil diperbarui!')
    } else {
      await createProduct(form)
      showSuccess('Produk berhasil ditambahkan!')
    }

    emit('saved')

    await nextTick()

    if (modalRef.value) {
      const modal = bootstrap.Modal.getOrCreateInstance(modalRef.value)
      modal.hide()
    }

  } catch (err) {
    showError('Gagal menyimpan produk.')
  }
}
</script>
