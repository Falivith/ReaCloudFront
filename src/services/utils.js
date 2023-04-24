import axios from 'axios'

export async function checkLoginStatus() {
  const user = window.localStorage.getItem('user')   
  const userObject = JSON.parse(user)
  
  const config = {
    headers: { Authorization: `Bearer ${userObject?.token}` },
  }
  
  return {userObject,config}
}

export const baseUrl = axios.create({
  baseURL: 'http://localhost:5000' //|| 'https://reacloud-back.vercel.app'
});
