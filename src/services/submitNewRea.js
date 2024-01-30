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

  if(userObject){
    const response = await baseUrl.post(`/api/recurso`, recurso, reaConfig)
    return response;
  }
  else{
    console.log("Você não pode cadastrar um recurso sem estar logado.");
    return null;
  }
}

export async function deleteRea(recursoId) {
  const { userObject, config } = await checkLoginStatus();

  const reaConfig = {
    headers: {
      'Authorization': `${config.headers.Authorization}`,
    },
  };

  if (userObject) {
    try {
      const response = await baseUrl.delete(`/api/recurso/${recursoId}`, reaConfig);
      return response;
    } catch (error) {
      console.error('Error deleting resource:', error);
      return null;
    }
  } else {
    console.log('Você não pode excluir um recurso sem estar logado.');
    return null;
  }
}
