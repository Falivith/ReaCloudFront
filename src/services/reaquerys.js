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
  const response = await baseUrl.get(`/api/recurso/${resourceId}`);
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
      //console.error("Nenhum Usuário Logado.");
      return [];
    }
  } catch (error) {
    console.error("Erro ao obter recursos do usuário:", error);
    return [];
  }
}

export async function liked(resourceId){
  try {
    let reaCloudSession = await JSON.parse(localStorage.getItem("reaCloudSession"));
    let token = reaCloudSession?.jwt_token;
    if (token) {
      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };
      const response = await baseUrl.get(`/api/recurso/${resourceId}/liked`, config);
      if (response.status === 200 && response.data.liked) {
        return true;
      } else {
        return false;
      }
    } else {
      //console.log("Nenhum Usuário Logado.");
      return undefined;
    }
  } catch (error) {
    console.error("Erro ao consultar like:", error);
    return false;
  }
}

// Adicionar ou remover um like de um recurso
export async function toggleLike(resourceId) {
  try {
    let reaCloudSession = await JSON.parse(localStorage.getItem("reaCloudSession"));
    let token = reaCloudSession?.jwt_token;
    if (token) {
      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };
      // Verifica se o usuário já deu like nesse recurso
      const response = await baseUrl.post(`/api/recurso/${resourceId}/like`, {}, config);
      if (response.status === 201) {
        return true;
      } else if (response.status === 204) {
        return false;
      }
    } else {
      //console.error("Nenhum Usuário Logado.");
      return { success: false, message: 'Nenhum usuário logado.' };
    }
  } catch (error) {
    console.error("Erro ao adicionar/remover like:", error);
    return { success: false, message: 'Erro ao processar a solicitação de Like.' };
  }
}

export async function getLikeCount(resourceId) {
  try {
    const response = await baseUrl.get(`/api/recurso/${resourceId}/likes/count`);
    return response.data.likeCount;
  } catch (error) {
    console.error("Erro ao obter o número de likes:", error);
    return null;
  }
}
