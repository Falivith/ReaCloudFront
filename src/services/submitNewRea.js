import axios from 'axios'
import { checkLoginStatus } from './utils';

const baseUrl = axios.create({
  baseURL: 'http://localhost:3001'
});

export async function submitRea(recurso){
  const {userObject,config} = await checkLoginStatus()
  

  console.log('recurso = ', recurso);

  if(userObject){
    const response = await baseUrl.post(`/api/recurso`, recurso, config)
  }
  else{
    console.log("Sem usuário logado");
  }
}
