import { baseUrl } from './utils';

  export async function getAllReas() {

   const reas = await baseUrl.get('/api/recurso', async (req, res) => {
      const reas = await baseUrl.get();
      res.status(201).json(reas);
    })
    return reas.data;
  }


  export async function filterReas(filter) {
    const reas = await baseUrl.get('/api/recurso/filter', {
        params: filter
    })
    return reas.data;
}




  
  export async function getReaInfo(id) {

    const reaInfo = await baseUrl.get('./api/recurso/' + id + '/', async (req, res) => {
      console.log("Cheguei")
      const reas = await baseUrl.get();
      res.status(201).json(reas);
    })
    return reas.data;
  }
