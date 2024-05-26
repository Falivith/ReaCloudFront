import { checkLoginStatus } from './utils';
import { baseUrl } from './utils';

export async function checkLogin() {
  let token = JSON.parse(localStorage.getItem('reaCloudSession'))?.token
 
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
      'reaCloudSession', JSON.stringify(response.data)
    )}
   
  return response.data
}

export async function loginOAuth(credentials) {
  const response = await baseUrl.post('/api/googleLogin', credentials)
  return response.data
}

export async function register(credentials) {
  const response = await baseUrl.post('/api/users', credentials)
  return response.data
}

export async function getUser() {
  const {userObject, config} = await checkLoginStatus()
  
  if (userObject) {
    const response = await baseUrl.get(`/api/users/${userObject.email}`, config)
    return response.data
  }

  console.log("Nenhum usuário logado.");  
}

export async function updateUser(updatedUser) {
  
  const {userObject, config} = await checkLoginStatus()

  if (userObject) {
    const response = await baseUrl.put(`/api/users/${userObject?.email}`, updatedUser, {
      ...config,
      validateStatus: function (status) {
        return true; // Isso faz com que a Axios não rejeite a promessa com base no status da resposta
      },
    });

    return {
      data: response.data,
      status: response.status
    };
  }
}

export async function uploadPhoto(profilePicture) {
  
  const {userObject,config} = await checkLoginStatus()

  console.log('profilePicture = ', profilePicture.get('file'));
  if (userObject) {
    try{
      const response = await baseUrl.post('/api/users/uploadPhoto', profilePicture,config)
      return response.data
    }
    catch(error){
      console.log("error");
    }  
  }
}

export async function getProfilePicture() {
  
  const {userObject,config} = await checkLoginStatus()

  if (userObject) {
    const response = await baseUrl.get('/api/users/uploadPhoto', config)
    return response.data
  }
}

export async function updateUserAccount(password, newPassword) {    // pra email e senha  
  
  const {userObject,config} = await checkLoginStatus()

  if (userObject) {
    const response = await baseUrl.put('/api/users/dados', {password,newPassword},config)
    return response.data
  }
}
