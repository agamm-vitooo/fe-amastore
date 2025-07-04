// services/uploadService.js
import api from './Api'

const uploadFile = async (endpoint, file, fieldName = 'image') => {
  if (!file) throw new Error('File tidak ditemukan')

  const formData = new FormData()
  formData.append(fieldName, file)

  const res = await api.post(`/upload/${endpoint}`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })

  return res.data.data.image_url
}

export const uploadProductImage = async (file) => {
  return await uploadFile('product', file)
}

export const uploadAvatarImage = async (file) => {
  return await uploadFile('avatar', file)
}
