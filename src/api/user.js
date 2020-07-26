import { API_HOST } from "../utils/constant";
import { getTokenApi } from "./auth";

export function getUserApi(id) {
  //se ocupa de hacer la peticion al servidor, la cual recibe el id del usuario, hay q exportarla porq la va a usar otro componente
  const url = `${API_HOST}/verperfil?id=${id}`;
  const params = {
    headers: {
      "Content-Type": "application-json",
      Authorization: `Bearer ${getTokenApi()}`,
    },
  };
  return fetch(url, params)
    .then((response) => {
      // eslint-disable-next-line no-throw-literal
      if (response.status >= 400) throw null; //esto es para cuando el usuario entre a una pagina q no existe
      return response.json();
    })
    .then((result) => {
      return result;
    })
    .catch((err) => {
      //esto es en caso q la linea 14 se cumpla
      return err;
    });
}

export function uploadBannerApi(file) {
  const url = `${API_HOST}/subirBanner`;

  const formData = new FormData(); //esto se hizo porq file es un tipo multifomra como lo vimos en postman
  formData.append("banner", file);

  const params = {
    method: "POST",
    headers: {
      Authorization: `Bearer ${getTokenApi()}`,
    },
    body: formData,
  };
  return fetch(url, params)
    .then((response) => {
      return response.json();
    })
    .then((result) => {
      return result;
    })
    .catch((err) => {
      return err;
    });
}

export function uploadAvatarApi(file) {
  const url = `${API_HOST}/subirAvatar`;

  const formData = new FormData(); //esto se hizo porq file es un tipo multifomra como lo vimos en postman
  formData.append("avatar", file);

  const params = {
    method: "POST",
    headers: {
      Authorization: `Bearer ${getTokenApi()}`,
    },
    body: formData,
  };
  return fetch(url, params)
    .then((response) => {
      return response.json();
    })
    .then((result) => {
      return result;
    })
    .catch((err) => {
      return err;
    });
}

export function updateInfoApi(data) {
  const url = `${API_HOST}/modificarPerfil`;

  const params = {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${getTokenApi()}`,
    },
    body: JSON.stringify(data),
  };
  return fetch(url, params)
    .then((response) => {
      return response;
    })
    .catch((err) => {
      return err;
    });
}
