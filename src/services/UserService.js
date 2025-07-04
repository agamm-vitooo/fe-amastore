// services/clientService.js
import api from './Api'

// ✅ Ambil semua client
export const getAllClients = async () => {
  const res = await api.get('/clients')
  return res.data.data
}

// ✅ Tambah client (oleh admin)
export const registerClient = async (data) => {
  const res = await api.post('/clients/register', data)
  return res.data
}

// ✅ Hapus client
export const deleteClient = async (id) => {
  return await api.delete(`/clients/${id}`)
}

// ✅ Update client
export const updateClient = async (id, data) => {
  return await api.put(`/clients/${id}`, data)
}

// 🔍 Ambil detail client by ID
export const getClientById = async (id) => {
  const res = await api.get(`/clients/${id}`)
  return res.data.data
}

// 🔄 Reset password client (opsional)
export const resetClientPassword = async (id, newPassword) => {
  return await api.put(`/clients/${id}/reset-password`, {
    password: newPassword,
  })
}
