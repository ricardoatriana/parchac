import React, { useState, useEffect } from "react";
import { Button, Spinner } from "react-bootstrap";
import { withRouter } from "react-router-dom"; //sirve para sacar los datos q tenemos en nuestra ruta acutal mediante los props
import { toast } from "react-toastify";
import useAuth from "../../hooks/useAuth";
import BasicLayout from "../../layout/BasicLayout";
import BannerAvatar from "../../components/User/BannerAvatar";
import InfoUser from "../../components/User/InfoUser";
import ListParlas from "../../components/ListParlas";
import { getUserApi } from "../../api/user";
import { getUserParlasApi } from "../../api/parla";

import "./User.scss";

function User(props) {
  const { match, setRefreshCheckLogin } = props;
  const [user, setUser] = useState(null);
  const [parlas, setParlas] = useState(null); //empieza como nulo porq no hay parlas
  const [page, setPage] = useState(1);
  const [loadingParlas, setLoadingParlas] = useState(false);
  const { params } = match;
  const loggedUser = useAuth(); //esta var es la q se pasa a banner avatar, para luego ir a baneer avatar y recuperar ese prop
  /*console.log(parlas);*/

  useEffect(() => {
    getUserApi(params.id)
      .then((response) => {
        if (!response) toast.error("El usuario que has visitado no existe");
        setUser(response);
      })
      .catch(() => {
        toast.error("El usuario que has visitado no existe");
      });
  }, [params]); //si no se le hubiera puesto el params cada vez q no encuentra un usuario se tendria q recargar la pagina, de esta manera se recarga solo y el componente

  useEffect(() => {
    getUserParlasApi(params.id, 1) // el 1 es de el param pagina
      .then((response) => {
        setParlas(response);
      })
      .catch(() => {
        setParlas([]);
      });
  }, [params]);

  const moreData = () => {
    const pageTemp = page + 1;
    setLoadingParlas(true);
    getUserParlasApi(params.id, pageTemp).then((response) => {
      if (!response) {
        //si response viene sin contenido
        setLoadingParlas(0);
      } else {
        setParlas([...parlas, ...response]);
        setPage(pageTemp); //para luego saber en q pagina estamos
        setLoadingParlas(false); //puede obtener mas parlas porque puede ser q el sig pagina haya mas parlas
      }
    });
  };

  return (
    <BasicLayout>
      <div className="user_title" setRefreshCheckLogin={setRefreshCheckLogin}>
        <h2>
          {user ? `${user.nombre} ${user.apellido}` : "Este usuario no existe"}
        </h2>
      </div>
      <BannerAvatar user={user} loggedUser={loggedUser} />
      <InfoUser user={user} />
      <div className="user__parlas">
        <h3>Parlas</h3>
        {parlas && <ListParlas parlas={parlas} />}
        <Button onCLick={moreData}>
          {!loadingParlas ? (
            loadingParlas !== 0 && "Obtener Parlas"
          ) : (
            <Spinner
              as="span"
              animation="grow"
              size="sm"
              role="status"
              arian-hidden="true"
            />
          )}
        </Button>
      </div>
    </BasicLayout> //aqui renderizamos las parlas, y se envian al arch listparlas.js
  );
}

export default withRouter(User);
