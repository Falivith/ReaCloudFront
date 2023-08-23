import axios from 'axios';

export async function checkLoginStatus() {
  const user = window.localStorage.getItem('user')   
  const userObject = JSON.parse(user)
  
  const config = {
    headers: { Authorization: `Bearer ${userObject?.token}` },
  }
  
  return {userObject,config}
}

export const baseUrl = axios.create({
  baseURL: process.env.NODE_ENV === 'development'? 'http://localhost:3001': 'https://reacloud2.fly.dev'
});
