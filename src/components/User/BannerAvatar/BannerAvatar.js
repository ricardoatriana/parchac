import React, { useState, useEffect } from "react"; //el useEffect es para poder usar la funcion checkFollowApi, endpoint consultaRelacion
import { Button } from "react-bootstrap";
import ConfigModal from "../../Modal/ConfigModal";
import EditUserForm from "../../User/EditUserForm";
import AvatarNoFound from "../../../assets/png/avatar-no-found.png";
import { API_HOST } from "../../../utils/constant";
import "./BannerAvatar.scss";

import {
  checkFollowApi,
  followUserApi,
  unfollowUserApi,
} from "../../../api/follow";
export default function BannerAvatar(props) {
  const { user, loggedUser } = props; //user es el usuario q estamos viendo y logggedUser el usuario logeado
  const [showModal, setShowModal] = useState(false); //este estado se creo para abrir el modal de editar perfil
  const [following, setFollowing] = useState(null); //Inicia como nulo, porque cuando entremos en la lista no sabemos si estamos siguiendo al usuario o no
  const [reloadFollow, setReloadFollow] = useState(null); //Ejecuta el useEffect. Esto evita que yo tenga q darle actualizar a la pagina, hace q sea reactivo.
  const bannerUrl = user?.banner //? se usa para q cuadno encuentre a un usuario q no existe no se dañe
    ? `${API_HOST}/obtenerBanner?id=${user.id}`
    : null;
  const avatarUrl = user?.avatar //? se usa para q cuadno encuentre a un usuario q no existe no se dañe
    ? `${API_HOST}/obtenerAvatar?id=${user.id}`
    : AvatarNoFound;
  //La funcion de abajo es para consultaRelacion si 2 usuarios se siguen o no
  useEffect(() => {
    if (user) {
      //esto es para que cuadno entramos a la pag de un usuario el boton cambia a uno nuevo, no cambie.
      checkFollowApi(user?.id).then((response) => {
        if (response?.status) {
          //si el status es q lo estamos siguiendo entonces true sino entonces false
          setFollowing(true);
        } else {
          setFollowing(false);
        }
      });
      setReloadFollow(false);
    }
  }, [user, reloadFollow]); //este user quiere decir cuando la pagina cambia de usuario recargate. Cuando el estado reloadFollow se actualice vuelve a ejecutarse

  const onFollow = () => {
    followUserApi(user.id).then(() => {
      setReloadFollow(true);
    });
  };

  const onUnFollow = () => {
    unfollowUserApi(user.id).then(() => {
      setReloadFollow(true);
    });
  };
  return (
    <div
      className="banner-avatar"
      style={{ backgroundImage: `url('${bannerUrl}')` }}
    >
      <div
        className="avatar"
        style={{ backgroundImage: `url('${avatarUrl}')` }}
      />

      {user && ( // si user existe entonces renderiza, si _id es igual a id significa q esta en su propio perfil
        <div className="options">
          {loggedUser._id === user.id && (
            <Button onClick={() => setShowModal(true)}>Editar Perfil </Button>
          )}

          {
            loggedUser._id !== user.id &&
              following !== null &&
              (following ? (
                <Button onClick={onUnFollow} className="unfollow">
                  <span>Siguiendo</span>
                </Button>
              ) : (
                <Button onClick={onFollow}>Seguir</Button>
              )) //si following es cierto lo estamos siguiendo sino seguir
          }
        </div>
      )}
      <ConfigModal
        show={showModal}
        setShow={setShowModal}
        title="Editar Perfil"
      >
        Formulario de Edicion
        <EditUserForm user={user} setShowModal={setShowModal} />
      </ConfigModal>
    </div> //el setshowmodal es para que cuadno el usuario le de a guardar datos podamos cerrar el modal desde dentro del form
  );
}
