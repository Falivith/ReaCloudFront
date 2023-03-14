import axios from 'axios'


const login = async credentials => {
  const response = await axios.post('/api/login', credentials)
  return response.data
}

const register = async credentials => {
  const response = await axios.post('/api/users', credentials)
  return response.data
}

export default register