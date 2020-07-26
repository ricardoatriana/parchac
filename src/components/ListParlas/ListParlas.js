import React, { useState, useEffect } from "react";
import { Image } from "react-bootstrap";
import { map } from "lodash"; //para hacer un bucle de nuestros datos
import moment from "moment";
import { getUserApi } from "../../api/user";
import AvatarNoFound from "../../assets/png/avatar-no-found.png";
import { API_HOST } from "../../utils/constant";
import { replaceURLWithHTMLLinks } from "../../utils/functions";

import "./ListParlas.scss";

export default function ListParlas(props) {
  const { parlas } = props;
  return (
    <div className="list-parlas">
      {map(parlas, (parla, index) => (
        <Parla key={index} parla={parla} />
      ))}
    </div> //se la pasa la lista de parlas y por cada iteraccion nos devuelve una parla
  );
}

function Parla(props) {
  //este es el componente q renderiza parla por parla, listparlas solamente lo recorre y luego se los pasa a este
  const { parla } = props;
  const [userInfo, setUserInfo] = useState(null);
  const [avatarUrl, setAvatarUrl] = useState(null);

  useEffect(() => {
    getUserApi(parla.userId).then((response) => {
      setUserInfo(response);
      setAvatarUrl(
        response?.avatar
          ? `${API_HOST}/obtenerAvatar?id=${response.id}`
          : AvatarNoFound
      ); //si hay avatar regresa imagen sino Avatarnofound
      /*console.log(response)*/
    });
  }, [parla]);
  //console.log(props);

  return (
    //name es el nombre del usuarior y moment es el paquete mas bonito
    <div className="parla">
      <Image className="avatar" src={avatarUrl} roundedCircle />
      <div>
        <div className="name">
          {userInfo?.nombre} {userInfo?.apellido}
          <span>{moment(parla.fecha).calendar()}</span>
        </div>
        <div
          dangerouslySetInnerHTML={{
            __html: replaceURLWithHTMLLinks(parla.mensaje),
          }}
        />
      </div>
    </div> // el replaceUrlwithlinks detecta automaticamente las url y las pasa a link cliqueable
  );
}
