<template>
  <div class="modal fade" ref="modalRef" id="categoryModal" tabindex="-1" aria-labelledby="categoryModalLabel" aria-hidden="true">
    <div class="modal-dialog">
      <form class="modal-content" @submit.prevent="onSubmit">
        <div class="modal-header">
          <h5 class="modal-title" id="categoryModalLabel">
            {{ form._id ? 'Edit Kategori' : 'Tambah Kategori' }}
          </h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>

        <div class="modal-body">
          <div class="mb-3">
            <label class="form-label">Nama Kategori</label>
            <input
              v-model="form.name"
              type="text"
              class="form-control"
              required
              placeholder="Contoh: Paket 25k"
            />
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
import { createCategory } from '../services/CategoryService'
import { showSuccess, showError } from '../utils/swal'

const props = defineProps(['initialData'])
const emit = defineEmits(['saved'])

const form = reactive({ ...props.initialData })
const modalRef = ref(null)

watch(() => props.initialData, (val) => Object.assign(form, val))

const onSubmit = async () => {
  try {
    await createCategory(form)
    showSuccess('Kategori berhasil ditambahkan!')
    emit('saved')

    await nextTick()

    if (modalRef.value) {
      const modal = bootstrap.Modal.getOrCreateInstance(modalRef.value)
      modal.hide()
    }

  } catch (err) {
    showError('Gagal menyimpan kategori.')
  }
}
</script>
