import { API_HOST, TOKEN } from "../utils/constant";
import jwtDecode from "jwt-decode"; //para desencriptar el token

export function signUpApi(user) {
  const url = `${API_HOST}/registro`;
  const userTemp = {
    ...user,
    email: user.email.toLowerCase(),
    fechaNacimiento: new Date(), //fecha creacion BD
  };
  delete userTemp.repeatClave; //esto evita q aparezca doble vez el email, para no enviarlo

  const params = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userTemp),
  };

  return fetch(url, params) //esta es una promesa
    .then((response) => {
      if (response.status >= 200 && response.status < 300) {
        return response.json();
      }
      return { code: 404, message: "Email no disponible" };
    })
    .then((result) => {
      return result;
    })
    .catch((err) => {
      return err;
    });
}

export function signInApi(user) {
  const url = `${API_HOST}/login`;
  const data = {
    ...user,
    email: user.email.toLowerCase(),
  };
  const params = {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(data), //data es la data introducida por el usuario
  };

  return fetch(url, params)
    .then((response) => {
      if (response.status >= 200 && response.status < 300) {
        return response.json();
      }
      return { code: 404, message: "Usuario o contraseña incorrecto" };
    })
    .then((result) => {
      return result;
    })
    .catch((err) => {
      return err;
    });
}

export function setTokenApi(token) {
  localStorage.setItem(TOKEN, token);
}

export function getTokenApi() {
  return localStorage.getItem(TOKEN);
}

export function logoutApi() {
  localStorage.removeItem(TOKEN);
}

export function isUserLogedApi() {
  const token = getTokenApi();
  //si token no existe
  if (!token) {
    logoutApi();
    return null;
  }
  if (isExpired(token)) {
    logoutApi();
  }
  return jwtDecode(token);
  //console.log(isExpired(token));
}

function isExpired(token) {
  const { exp } = jwtDecode(token); //del token se coge exp
  const expire = exp * 1000;
  const timeout = expire - Date.now(); //si expire es menor a la fecha de hoy es negativo, significa q ha expirado

  if (timeout < 0) {
    //Si es menor quiere decir que es true q expiro
    return true;
  }
  return false;
}
