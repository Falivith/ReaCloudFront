import { baseUrl } from './utils';

  export async function getAllReas() {

   const reas = await baseUrl.get('/api/recurso', async (req, res) => {
      const reas = await baseUrl.get();
      res.status(201).json(reas);
    })
    return reas.data;
  }
  