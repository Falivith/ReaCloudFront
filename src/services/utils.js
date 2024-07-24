import axios from 'axios';

export async function checkLoginStatus() {
  const user = window.localStorage.getItem('reaCloudSession')   
  const userObject = JSON.parse(user)
  
  const config = {
    headers: { Authorization: `Bearer ${userObject?.token}` },
  }
  
  return {userObject,config}
}

console.log("Environment Production?", import.meta.env.VITE_PRODUCTION);

// Comparação correta com a string 'true'
console.log("Comparação Resultado: ", (import.meta.env.VITE_PRODUCTION === 'true') ? 'https://reacloud.duckdns.org' : 'http://localhost:4001');

export const baseUrl = axios.create({
  baseURL: (import.meta.env.VITE_PRODUCTION === 'true') ? 'https://reacloud.duckdns.org' : 'http://localhost:4001'
});

const backURL = (import.meta.env.VITE_PRODUCTION === 'true') ? 'https://reacloud.duckdns.org' : 'http://localhost:4001';


export { backURL };