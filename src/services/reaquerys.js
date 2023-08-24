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


export async function getUserResources() {
  const {userObject,config} = await checkLoginStatus()
  
  
  if (userObject) {
    const response = await baseUrl.get(`/api/recurso/user`, config)
    return response.data
  }

  console.log("nenhum usuario logado");  
}


  
  export async function getReaInfo(id) {

    const reaInfo = await baseUrl.get('./api/recurso/' + id + '/', async (req, res) => {
      console.log("Cheguei")
      const reas = await baseUrl.get();
      res.status(201).json(reas);
    })
    return reas.data;
  }
