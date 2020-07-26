import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom"; //el link es como un <a href=""> la dif es q link recarga componentes y a la pagina
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faUser,
  faUsers,
  faPowerOff,
} from "@fortawesome/free-solid-svg-icons";
import ParlaModal from "../Modal/ParlaModal";
import { logoutApi } from "../../api/auth";
import useAuth from "../../hooks/useAuth";
import LogoBlanco from "../../assets/png/logo.png";

import "./LeftMenu.scss";

export default function LeftMenu(props) {
  const { setRefreshCheckLogin } = props;
  const [showModal, setShowModal] = useState(false);
  const user = useAuth();
  const logout = () => {
    logoutApi();
    setRefreshCheckLogin(true);
  };
  return (
    <div className="left-menu">
      <img className="logo" src={LogoBlanco} alt="Parcha" />

      <Link to="/">
        <FontAwesomeIcon icon={faHome} /> Inicio
      </Link>
      <Link to="/users">
        <FontAwesomeIcon icon={faUsers} /> Usuarios
      </Link>
      <Link to={`/${user?._id}`}>
        <FontAwesomeIcon icon={faUser} /> Perfil
      </Link>
      <Link to="" onClick={logout}>
        <FontAwesomeIcon icon={faPowerOff} /> Cerrar sesion
      </Link>
      <Button onClick={() => setShowModal(true)}>Parlar</Button>
      <ParlaModal show={showModal} setShow={setShowModal} />
    </div>
  );
}
