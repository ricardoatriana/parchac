import React, { useState, useEffect } from "react";
import SigninSignup from "./page/SigninSignup";
import { ToastContainer } from "react-toastify";
import { AuthContext } from "./utils/context";
import { isUserLogedApi } from "./api/auth";
import Routing from "./routes/Routing";

export default function App() {
  const [user, setUser] = useState(null); //useState en null es q no esta logeado, si se cambia a name:{"Augs"} ahi se se pondria como logeado
  const [loadUser, setLoadUser] = useState(false); //Esto es para que cuando setUser se actualice vuelva a ejecturse de nuevo
  const [refreshCheckLogin, setRefreshCheckLogin] = useState(false); //sistema de rutas logeado o noLogoeado

  //Cuando el useState de checkLogin se actualiza a traves de setRefreshCheckLogin(true) despues de haber seteado el token en SignInfor.js el useEffect se vuelve a ejecutar
  useEffect(() => {
    setUser(isUserLogedApi());
    setRefreshCheckLogin(false); //para que cuando se vuelva a ejecutar el useState vuelva a com estaba al principio en flase
    setLoadUser(true); //Esto es para que cuando setUser se actualice vuelva a ejecturse de nuevo
  }, [refreshCheckLogin]);

  if (!loadUser) return null;

  return (
    <AuthContext.Provider value={user}>
      {user ? (
        <Routing setRefreshCheckLogin={setRefreshCheckLogin} />
      ) : (
        <SigninSignup setRefreshCheckLogin={setRefreshCheckLogin} />
      )}

      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnVisibilityChange
        draggable
        pauseOnHover
      />
    </AuthContext.Provider>
    //el codigo de Toast container esta en la pagina oficial de ellos
  );
}
