import { isLogged } from './authentication';
import { checkLoginStatus } from './utils';
import { baseUrl } from './utils';

export async function submitRea(recurso){

  let reaCloudSession = await JSON.parse(localStorage.getItem("reaCloudSession"))
  let token = reaCloudSession?.jwt_token;

  const logged = await isLogged();

  const reaConfig = {
    headers: {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'multipart/form-data',      
    }
  };

  if(logged){
    const response = await baseUrl.post(`/api/recurso`, recurso, reaConfig)
    return response;
  }
  else{
    console.log("Você não pode cadastrar um recurso sem estar logado.");
    return null;
  }
}

export async function deleteRea(recursoId) {
  let reaCloudSession = await JSON.parse(localStorage.getItem("reaCloudSession"))
  let token = reaCloudSession?.jwt_token;

  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };

  if (token) {
    try {
      const response = await baseUrl.delete(`/api/recurso/${recursoId}`, config);
      return response;
    } catch (error) {
      console.error('Erro ao deletar o recurso:', error);
      return null;
    }
  } else {
    console.log('Você não pode excluir um recurso sem estar logado.');
    return null;
  }
}
