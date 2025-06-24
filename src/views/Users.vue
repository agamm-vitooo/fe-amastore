<template>
 <div class="container mt-4">
    <h2 class="mb-4">Manajemen User</h2>

    <!-- ✅ Form Tambah Client -->
    <form @submit.prevent="handleCreate" class="row g-2 g-md-3 mb-4">
      <div class="col-12 col-sm-6 col-md-3">
        <input v-model="newClient.name" type="text" class="form-control" placeholder="Nama" required />
      </div>
      <div class="col-12 col-sm-6 col-md-3">
        <input v-model="newClient.email" type="email" class="form-control" placeholder="Email" required />
      </div>
      <div class="col-12 col-sm-6 col-md-2">
        <input v-model="newClient.phone" type="text" class="form-control" placeholder="Telepon" required />
      </div>
      <div class="col-12 col-sm-6 col-md-2">
        <input v-model="newClient.password" type="password" class="form-control" placeholder="Password" required />
      </div>
      <div class="col-12 col-md-2">
        <button type="submit" class="btn btn-primary w-100">Tambah</button>
      </div>
    </form>

    <!-- ✅ Responsive Table Wrapper -->
    <div class="table-responsive">
      <table class="table table-bordered table-striped">
        <thead class="table-light">
          <tr>
            <th>Nama</th>
            <th>Email</th>
            <th>Telepon</th>
            <th>Dibuat</th>
            <th>Aksi</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="client in clients" :key="client._id">
            <td>{{ client.name }}</td>
            <td>{{ client.email }}</td>
            <td>{{ client.phone }}</td>
            <td>{{ new Date(client.createdAt).toLocaleString() }}</td>
            <td>
              <button class="btn btn-sm btn-warning me-1 mb-1" @click="openEditModal(client)">Edit</button>
              <button class="btn btn-sm btn-danger mb-1" @click="handleDelete(client._id)">Hapus</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div v-if="clients.length === 0" class="text-muted text-center py-4">
      Tidak ada data client.
    </div>
  </div>

  <!-- ✅ Modal Edit -->
  <div class="modal fade" id="editModal" tabindex="-1" ref="editModalRef">
    <div class="modal-dialog">
      <div class="modal-content">
        <form @submit.prevent="handleUpdate">
          <div class="modal-header">
            <h5 class="modal-title">Edit Client</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
          </div>
          <div class="modal-body">
            <div class="mb-3">
              <label class="form-label">Nama</label>
              <input v-model="editedClient.name" type="text" class="form-control" required />
            </div>
            <div class="mb-3">
              <label class="form-label">Email</label>
              <input v-model="editedClient.email" type="email" class="form-control" required />
            </div>
            <div class="mb-3">
              <label class="form-label">Telepon</label>
              <input v-model="editedClient.phone" type="text" class="form-control" required />
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
import { ref, onMounted } from 'vue'
import { Modal } from 'bootstrap'
import {
  getAllClients,
  deleteClient,
  updateClient,
  registerClient
} from '../services/UserService'
import { showSuccess, showError, showConfirm } from '../utils/swal'

const clients = ref([])
const newClient = ref({ name: '', email: '', phone: '', password: '' })
const editedClient = ref({ name: '', email: '', phone: '' })
const currentClientId = ref(null)
const editModalRef = ref(null)
let editModalInstance = null

const fetchClients = async () => {
  try {
    const result = await getAllClients()
    clients.value = result
  } catch (err) {
    showError('Gagal memuat data client')
  }
}

const handleCreate = async () => {
  try {
    await registerClient(newClient.value)
    showSuccess('Client berhasil ditambahkan')
    newClient.value = { name: '', email: '', phone: '', password: '' }
    fetchClients()
  } catch (err) {
    showError('Gagal menambahkan client')
  }
}

const openEditModal = (client) => {
  editedClient.value = { ...client }
  currentClientId.value = client._id
  if (!editModalInstance) {
    editModalInstance = new Modal(editModalRef.value)
  }
  editModalInstance.show()
}

const handleUpdate = async () => {
  try {
    await updateClient(currentClientId.value, editedClient.value)
    showSuccess('Client berhasil diupdate')
    fetchClients()
    editModalInstance.hide()
  } catch (err) {
    showError('Gagal mengupdate client')
  }
}

const handleDelete = async (id) => {
  const confirmed = await showConfirm('Yakin ingin menghapus client ini?')
  if (!confirmed) return
  try {
    await deleteClient(id)
    clients.value = clients.value.filter(c => c._id !== id)
    showSuccess('Client berhasil dihapus')
  } catch (err) {
    showError('Gagal menghapus client')
  }
}

onMounted(() => fetchClients())
</script>
