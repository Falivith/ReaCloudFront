import axios from 'axios'


export async function login(credentials) {
  const response = await axios.post('/api/login', credentials)
  return response.data
}

export async function register(credentials) {
  const response = await axios.post('/api/users', credentials)
  return response.data
}

export default {register,login}