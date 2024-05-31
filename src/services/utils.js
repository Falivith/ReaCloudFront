import axios from 'axios';

export async function checkLoginStatus() {
  const user = window.localStorage.getItem('reaCloudSession')   
  const userObject = JSON.parse(user)
  
  const config = {
    headers: { Authorization: `Bearer ${userObject?.token}` },
  }
  
  return {userObject,config}
}

console.log("Environment Production?", import.meta.env.VITE_PRODUCTION)

console.log("Comparação Resultado: ", (import.meta.env.VITE_PRODUCTION == 'false')? 'http://localhost:4001': 'https://reacloudback.onrender.com/');

export const baseUrl = axios.create({
  baseURL: (import.meta.env.VITE_PRODUCTION == 'false')? 'http://localhost:4001': 'https://reacloudback.onrender.com/'
});
