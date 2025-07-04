// src/services/adminService.js

import api from './Api'

export const login = (email, password) => {
  return api.post('/admins/login', { email, password })
}
