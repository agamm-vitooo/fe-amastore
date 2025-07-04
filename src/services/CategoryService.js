// src/services/categoryService.js
import api from './Api'

// GET semua kategori
export const getAllCategories = async () => {
  const res = await api.get('/categories')
  return res.data.data
}

// POST buat kategori baru
export const createCategory = async (data) => {
  const res = await api.post('/categories', data)
  return res.data
}
