import axios from 'axios'

const API = 'https://be-amastore.vercel.app/api/clients'

export const registerClient = async (data) => {
  const token = localStorage.getItem('admin_token')
  const res = await axios.post('https://be-amastore.vercel.app/api/clients/register', data, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
  return res.data
}

export const getAllClients = async () => {
  const token = localStorage.getItem('admin_token')
  const res = await axios.get(API, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
  return res.data.data
}

export const deleteClient = async (id) => {
  const token = localStorage.getItem('admin_token')
  return await axios.delete(`${API}/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
}

export const updateClient = async (id, data) => {
  const token = localStorage.getItem('admin_token')
  return await axios.put(`${API}/${id}`, data, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
}
