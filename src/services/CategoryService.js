import axios from 'axios'

const API = 'https://be-amastore.vercel.app/api/categories'
const token = () => localStorage.getItem('admin_token')

// GET semua kategori
export const getAllCategories = async () => {
  const res = await axios.get(API, {
    headers: {
      Authorization: `Bearer ${token()}`
    }
  })
  return res.data.data
}

// POST buat kategori baru
export const createCategory = async (data) => {
  return await axios.post(API, data, {
    headers: {
      Authorization: `Bearer ${token()}`
    }
  })
}
