// UserPage.vue
<template>
  <div class="container mt-4 px-2 px-sm-3">
    <h2 class="mb-4">Manajemen User</h2>

    <UserForm @create="handleCreate" />
    <UserList :users="users" @edit="openEditModal" @delete="handleDelete" />
    <EditUserModal ref="editModalRef" :user="editedUser" @update="handleUpdate" />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import UserForm from '../components/UserForm.vue'
import UserList from '../components/UserList.vue'
import EditUserModal from '../components/EditUserModal.vue'

import {
  getAllClients,
  registerClient,
  updateClient,
  deleteClient
} from '../services/UserService'
import { showSuccess, showError, showConfirm } from '../utils/swal'

const users = ref([])
const editedUser = ref({})
const currentUserId = ref(null)
const editModalRef = ref(null)

const fetchUsers = async () => {
  try {
    users.value = await getAllClients()
  } catch {
    showError('Gagal memuat user')
  }
}

const handleCreate = async (user) => {
  try {
    await registerClient(user)
    showSuccess('User berhasil ditambahkan')
    fetchUsers()
  } catch {
    showError('Gagal menambahkan user')
  }
}

const openEditModal = (user) => {
  editedUser.value = { ...user }
  currentUserId.value = user._id
  editModalRef.value.show()
}

const handleUpdate = async (updatedUser) => {
  try {
    await updateClient(currentUserId.value, updatedUser)
    showSuccess('User berhasil diupdate')
    fetchUsers()
  } catch {
    showError('Gagal mengupdate user')
  }
}

const handleDelete = async (id) => {
  const confirmed = await showConfirm('Yakin ingin menghapus user ini?')
  if (!confirmed) return
  try {
    await deleteClient(id)
    users.value = users.value.filter((u) => u._id !== id)
    showSuccess('User berhasil dihapus')
  } catch {
    showError('Gagal menghapus user')
  }
}

onMounted(fetchUsers)
</script>