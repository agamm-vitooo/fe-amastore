import api from './Api'

export const getAllProducts = async (page = 1, limit = 10) => {
  try {
    console.log(`[GET] /products?page=${page}&limit=${limit}`)
    const res = await api.get(`/products?page=${page}&limit=${limit}`)
    console.log('✅ Response:', res.status, res.data)
    return res.data.data.data // ✅ ambil array produk dari response
  } catch (err) {
    handleError('GET /products', err)
  }
}

export const createProduct = async (data) => {
  try {
    console.log('[POST] /products', data)
    const res = await api.post('/products', data)
    console.log('✅ Response:', res.status, res.data)
    return res.data
  } catch (err) {
    handleError('POST /products', err)
  }
}

export const updateProduct = async (id, data) => {
  try {
    console.log(`[PUT] /products/${id}`, data)
    const res = await api.put(`/products/${id}`, data)
    console.log('✅ Response:', res.status, res.data)
    return res.data
  } catch (err) {
    handleError(`PUT /products/${id}`, err)
  }
}

export const deleteProduct = async (id) => {
  try {
    console.log(`[DELETE] /products/${id}`)
    const res = await api.delete(`/products/${id}`)
    console.log('✅ Response:', res.status, res.data)
    return res.data
  } catch (err) {
    handleError(`DELETE /products/${id}`, err)
  }
}

// 🔧 Helper error logger
const handleError = (source, err) => {
  console.error(`❌ Error in ${source}`)
  if (err.response) {
    console.error('Status:', err.response.status)
    console.error('Data:', err.response.data)
  } else {
    console.error('Message:', err.message)
  }
  throw err // biar tetap bisa catch di pemanggil
}
