import axios from 'axios'

const baseUrl = axios.create({
  baseURL: 'http://localhost:3001'
});


export async function checkLogin() {
  let token = JSON.parse(localStorage.getItem('user'))?.token
 
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  }

  if (token !== null && token !== undefined) {
    const response = await baseUrl.post('/api/login/checkToken',config)    
    if (response.status == 200) {
      return true}
  }
  return false;

}

export async function login(credentials) {
  const response = await baseUrl.post('/api/login', credentials)
  
  if (response.status === 200){
    window.localStorage.setItem(
      'user', JSON.stringify(response.data)
    )}
   
  return response.data
}

export async function loginOAuth(credentials) {
  const response = await baseUrl.post('api/login/googleAuth', credentials)
  return response.data
}

export async function register(credentials) {
  const response = await baseUrl.post('/api/users', credentials)
  return response.data
}


export async function getUser() {
  const user = window.localStorage.getItem('user')   
  const userObject = JSON.parse(user)
  
  const config = {
    headers: { Authorization: `Bearer ${userObject?.token}` },
  }
  // futuramente colocar essa parte de cima em uma função(util), já que repeti no UpdateUser logo abaixo
  if (user) {
    
    const response = await baseUrl.get(`/api/users/${userObject.email}`, config)
    return response.data
  }

  console.log("nenhum usuario logado");  
  
}


export async function updateUser(updatedUser) {
  
  const user = window.localStorage.getItem('user')   
  const userObject = JSON.parse(user)
  
  const config = {
    headers: { Authorization: `Bearer ${userObject?.token}` },
  }
  // futuramente colocar essa parte de cima em uma função(util)

  console.log('updatedUser', updatedUser);
  
  const response = await baseUrl.put(`/api/users/${userObject?.email}`,updatedUser,config)
  return response.data
}

