<!-- EditUserModal.vue -->
<template>
  <div class="modal fade" id="editModal" tabindex="-1" ref="modalRef">
    <div class="modal-dialog modal-dialog-centered modal-md">
      <div class="modal-content">
        <form @submit.prevent="submitUpdate">
          <div class="modal-header">
            <h5 class="modal-title">Edit User</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
          </div>
          <div class="modal-body">
            <div class="mb-3">
              <label class="form-label">Nama</label>
              <input v-model="form.name" type="text" class="form-control" required />
            </div>
            <div class="mb-3">
              <label class="form-label">Email</label>
              <input v-model="form.email" type="email" class="form-control" required />
            </div>
            <div class="mb-3">
              <label class="form-label">Telepon</label>
              <input v-model="form.phone" type="text" class="form-control" required />
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Batal</button>
            <button type="submit" class="btn btn-primary">Simpan</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import { Modal } from 'bootstrap'

const props = defineProps(['user'])
const emit = defineEmits(['update'])
const modalRef = ref(null)
const form = ref({ name: '', email: '', phone: '' })
let modalInstance = null

watch(() => props.user, (val) => {
  if (val) form.value = { ...val }
})

const submitUpdate = () => {
  emit('update', form.value)
  modalInstance.hide()
}

onMounted(() => {
  modalInstance = new Modal(modalRef.value)
})

defineExpose({ show: () => modalInstance.show() })
</script>
