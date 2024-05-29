import { baseUrl } from "./utils";

// Consulta todos recursos
export async function getAllReas() {
  const reas = await baseUrl.get("/api/recurso", async (req, res) => {
    const reas = await baseUrl.get();
    res.status(201).json(reas);
  });
  return reas.data;
}

// Filtra os recursos
export async function filterReas(filter, currentPage, pageSize) {
  console.log(filter, currentPage, pageSize);
  const reas = await baseUrl.get("/api/recurso/filter", {
    params: {
      ...filter,
      currentPage: currentPage,
      pageSize: pageSize,
    },
  });
  return reas.data;
}

// Consulta informações avançadas do recurso
export async function getResourceInfo(resourceId) {
  const response = await baseUrl.get(`/api/recurso/resource/${resourceId}`);
  return response.data;
}

// Consulta recursos de um usuário
export async function getUserResources() {
  try {
    let reaCloudSession = await JSON.parse(
      localStorage.getItem("reaCloudSession")
    );
    let token = reaCloudSession?.jwt_token;
    if (token) {
      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };
      const response = await baseUrl.get(`/api/recurso/user`, config);
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
