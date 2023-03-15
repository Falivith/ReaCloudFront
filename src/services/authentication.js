import axios from 'axios'

let token = null

export function setToken(newToken){
  token = `Bearer ${newToken}`
}

export async function login(credentials) {
  const response = await axios.post('/api/login', credentials)
  return response.data
}

export async function register(credentials) {
  const response = await axios.post('/api/users', credentials)
  return response.data
}


export async function getUser(email) {
  const config = {
    headers: { Authorization: token },
  }
  
  const response = await axios.get(`/api/users/${email}`, config)
  return response.data
}

