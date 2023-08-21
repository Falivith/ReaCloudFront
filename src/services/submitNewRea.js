import { checkLoginStatus } from './utils';
import { baseUrl } from './utils';

export async function submitRea(recurso){
  const {userObject, config} = await checkLoginStatus()

  const reaConfig = {
    headers: {
    'Authorization': `${config.headers.Authorization}`,
    'Content-Type': 'multipart/form-data',      
    }
  };

  //console.log('recurso = ', ...recurso);

  if(userObject){
    const response = await baseUrl.post(`/api/recurso`, recurso, reaConfig)
    return response;
  }
  else{
    console.log("Você não pode cadastrar um recurso sem estar logado.");
    return null;
  }
}
