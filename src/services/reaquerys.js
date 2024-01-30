import { baseUrl, checkLoginStatus } from './utils';

  export async function getAllReas() {

   const reas = await baseUrl.get('/api/recurso', async (req, res) => {
      const reas = await baseUrl.get();
      res.status(201).json(reas);
    })
    return reas.data;
  }


  export async function filterReas(filter,currentPage,pageSize) {
    const reas = await baseUrl.get('/api/recurso/filter', {
      params: {
        ...filter,
        currentPage: currentPage,
        pageSize: pageSize,
      },
    })
    return reas.data;
}

export async function getResourceInfo(resourceId) {

    const response = await baseUrl.get(`/api/recurso/resource/${resourceId}`)
    return response.data
}

export async function getUserResources() {
  try {
    const { userObject, config } = await checkLoginStatus();

    if (userObject) {
      const response = await baseUrl.get(`/api/recurso/user`, config);
      console.log(response.data);
      return response.data;
    } else {
      console.log("Nenhum Usuário Logado.");
      return [];
    }
  } catch (error) {
    console.error("Erro ao obter recursos do usuário:", error);
    return [];
  }
}


export async function getReaInfo(id) {

  const reaInfo = await baseUrl.get('./api/recurso/' + id + '/', async (req, res) => {
    console.log("Cheguei")
    const reas = await baseUrl.get();
    res.status(201).json(reas);
  })
  return reas.data;
}
