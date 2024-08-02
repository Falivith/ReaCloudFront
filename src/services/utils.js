import axios from 'axios';

export async function checkLoginStatus() {
  const user = window.localStorage.getItem('reaCloudSession')   
  const userObject = JSON.parse(user)
  
  const config = {
    headers: { Authorization: `Bearer ${userObject?.jwt_token}` },
  }
  
  return {userObject,config}
}

console.log("Environment Production?", import.meta.env.VITE_PRODUCTION);
console.log("Comparação Resultado: ", (import.meta.env.VITE_PRODUCTION === 'true') ? 'https://reacloud.duckdns.org' : `http://localhost:${ import.meta.env.VITE_PORT }`);

export const baseUrl = axios.create({
  baseURL: (import.meta.env.VITE_PRODUCTION === 'true') ? 'https://reacloud.duckdns.org' : `http://localhost:${ import.meta.env.VITE_PORT }`,
});

const backURL = (import.meta.env.VITE_PRODUCTION === 'true') ? 'https://reacloud.duckdns.org' : `http://localhost:${ import.meta.env.VITE_PORT }`;


export { backURL };