import axios from 'axios'


export async function checkLogin() {
  let token = JSON.parse(localStorage.getItem('user'))?.token
  console.log('token =', token);
 
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  }

  if (token !== null && token !== undefined) {
    const response = await axios.post('/api/login/checkToken',config)    
    if (response.status == 200) {
      return true}
  }
  return false;

}

export async function login(credentials) {
  const response = await axios.post('/api/login', credentials)
  
  if (response.status === 200){
    window.localStorage.setItem(
      'user', JSON.stringify(response.data)
    )}
   
  return response.data
}

export async function loginOAuth(credentials) {
  const response = await axios.post('api/login/googleAuth', credentials)
  return response.data
}

export async function register(credentials) {
  const response = await axios.post('/api/users', credentials)
  return response.data
}


export async function getUser(email,token) {
  
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  }
  
  const response = await axios.get(`/api/users/${email}`, config)
  return response.data
}

