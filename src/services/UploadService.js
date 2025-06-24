import axios from 'axios'

const BASE_URL = 'https://be-amastore.vercel.app/api/upload'
const getToken = () => localStorage.getItem('admin_token')

const uploadFile = async (endpoint, file, fieldName = 'image') => {
  if (!file) throw new Error('File tidak ditemukan')

  const formData = new FormData()
  formData.append(fieldName, file)

  const res = await axios.post(`${BASE_URL}/${endpoint}`, formData, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
      'Content-Type': 'multipart/form-data'
    }
  })

  return res.data.data.image_url // asumsikan response standar
}

// 🔼 Gunakan helper `uploadFile()` di bawah ini

export const uploadProductImage = async (file) => {
  return await uploadFile('product', file, 'image')
}

export const uploadAvatarImage = async (file) => {
  return await uploadFile('avatar', file, 'image')
}
