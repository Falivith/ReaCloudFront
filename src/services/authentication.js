import { checkLoginStatus } from "./utils";
import { baseUrl } from "./utils";
import { jwtDecode } from 'jwt-decode';

export async function loginWithGoogle(code) {
  if (code) {
    console.log(baseUrl);
    const response = await baseUrl.post("/api/auth/", {
      code,
    });
    localStorage.setItem('reaCloudSession', JSON.stringify(response.data));
    if (response.status == 200) {
      return true;
    }
  }

  return false;
}

export async function isLogged() {
  let reaCloudSession = await JSON.parse(localStorage.getItem("reaCloudSession"));
  let token = reaCloudSession?.jwt_token;

  if (token) {
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };

    try {
      const response = await baseUrl.post("/api/auth/checkToken", null, config);
      if (response.status === 200) {
        return true;
      }
    } catch (error) {
      console.error('Sem token de autenticação.', error);
      localStorage.removeItem("reaCloudSession");
    }
  }

  return false;
}

export async function getUserInfoFromJWT() {
  let reaCloudSession = await JSON.parse(localStorage.getItem("reaCloudSession"));
  let token = reaCloudSession?.jwt_token;

  if (!token) return null;

  try {
    const decodedToken = jwtDecode(token);
    return decodedToken;
  } catch (error) {
    console.error('Error decoding token:', error);
    return null;
  }
}

export async function getUser(email) {
  const { userObject, config } = await checkLoginStatus();

  if (userObject) {
    const response = await baseUrl.get(
      `/api/users/${email}`,
      config
    );
    return response.data;
  }

  //console.error("Nenhum usuário logado.");
}

export async function updateUser(updatedUser) {
  const userData = await getUserInfoFromJWT();
  let reaCloudSession = await JSON.parse(localStorage.getItem("reaCloudSession"));
  let token = reaCloudSession?.jwt_token;

  const config = {
    headers: { Authorization: `Bearer ${token}` },
  }

  if (userData) {
    const response = await baseUrl.put(
      `/api/users/${userData?.email}`,
      updatedUser,
      {
        ...config,
        validateStatus: function (status) {
          return true; // Isso faz com que a Axios não rejeite a promessa com base no status da resposta
        },
      }
    );

    return {
      data: response.data,
      status: response.status,
    };
  }
}

export async function uploadPhoto(profilePicture) {
  const { userObject, config } = await checkLoginStatus();
  if (userObject) {
    try {
      const response = await baseUrl.post(
        "/api/users/uploadPhoto",
        profilePicture,
        config
      );
      return response.data;
    } catch (error) {
      console.error(error);
    }
  }
}

export async function getProfilePicture() {
  const { userObject, config } = await checkLoginStatus();

  if (userObject) {
    const response = await baseUrl.get("/api/users/uploadPhoto", config);
    return response.data.data;
  }
}

export async function deleteUser() {
  const userData = await getUserInfoFromJWT();
  let reaCloudSession = await JSON.parse(localStorage.getItem("reaCloudSession"));
  let token = reaCloudSession?.jwt_token;

  if (userData) {
    try {
      const response = await baseUrl.delete(
        `/api/users/${userData?.email}`,
        {
          headers: { Authorization: `Bearer ${token}` },
          validateStatus: function (status) {
            return true;
          }
        }
      );

      console.log('Delete response:', response.status, response.data);

      if (response.status === 204) {
        localStorage.removeItem("reaCloudSession");
        return true;
      }
      
      // Log specific error information from the response
      console.error('Server response:', response.status, response.data);
      return false;
    } catch (error) {
      console.error('Error deleting user:', error.message);
      if (error.response) {
        console.error('Server response:', error.response.status, error.response.data);
      }
      return false;
    }
  }
  return false;
}