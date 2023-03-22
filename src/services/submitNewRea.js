import axios from 'axios'
import { checkLoginStatus } from './utils';

const baseUrl = axios.create({
  baseURL: 'http://localhost:3001'
});

export async function submitRea(recurso){
  user,config = checkLoginStatus()

  if(user){
    const response = await baseUrl.post(`/api/users/${userObject.email}`, recurso, config)
  }
  else{
    console.log("Sem usuário logado");
  }
}
