import { API_HOST } from "../utils/constant";
import { getTokenApi } from "./auth";

export function addParlaApi(mensaje) {
  const url = `${API_HOST}/parla`;
  const data = {
    mensaje,
  };

  const params = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getTokenApi()}`,
    },
    body: JSON.stringify(data),
  };

  return fetch(url, params)
    .then((response) => {
      if (response.status >= 200 && response.status < 300) {
        return { code: response.status, message: "Parla enviada" };
      }
      return { code: 500, message: "Error del servidor." };
    })
    .catch((err) => {
      return err;
    });
}

export function getUserParlasApi(idUser, page) {
  //esta pagina por eso tn recibe pagina
  const url = `${API_HOST}/leoParlas?id=${idUser}&pagina=${page}`; //esta paginado

  const params = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getTokenApi()}`,
    },
  };

  return fetch(url, params)
    .then((response) => {
      return response.json();
    })
    .catch((err) => {
      return err;
    });
}

export function getParlasFollowersApi(page = 1) {
  const url = `${API_HOST}/leoParlasSeguidores?pagina=${page}`;

  const params = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getTokenApi()}`,
    },
  };

  return fetch(url, params)
    .then((response) => {
      return response.json();
    })
    .catch((err) => {
      return err;
    });
}
