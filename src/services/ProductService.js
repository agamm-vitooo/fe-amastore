// services/ProductService.js
import axios from 'axios'
const API = 'https://be-amastore.vercel.app/api/products'

const token = () => localStorage.getItem('admin_token')

export const getAllProducts = async (page = 1, limit = 10) => {
  const res = await axios.get(`${API}?page=${page}&limit=${limit}`, {
    headers: { Authorization: `Bearer ${token()}` }
  })
  const products = res.data.data.data 
  return products
}


export const createProduct = async (data) => {
  return await axios.post(API, data, {
    headers: { Authorization: `Bearer ${token()}` }
  })
}

export const updateProduct = async (id, data) => {
  return await axios.put(`${API}/${id}`, data, {
    headers: { Authorization: `Bearer ${token()}` }
  })
}

export const deleteProduct = async (id) => {
  return await axios.delete(`${API}/${id}`, {
    headers: { Authorization: `Bearer ${token()}` }
  })
}
