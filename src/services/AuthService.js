import axios from 'axios'

const API_URL = 'https://be-amastore.vercel.app/api/admins'

export const login = (email, password) => {
  return axios.post(`${API_URL}/login`, { email, password })
}
