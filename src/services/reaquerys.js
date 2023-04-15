import axios from 'axios'

const baseUrl = axios.create({
  baseURL: 'http://localhost:3001'
});

  export async function getAllReas() {

   const reas = await baseUrl.get('/api/recurso', async (req, res) => {
      const reas = await baseUrl.get();
      res.status(201).json(reas);
    })
    return reas.data;
  }
  