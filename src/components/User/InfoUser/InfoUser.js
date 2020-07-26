import React from "react";
import moment from "moment";
import localization from "moment/locale/es";
import { Location, Link, DateBirth } from "../../../utils/Icons";
import "./InfoUser.scss";

export default function InfoUser(props) {
  const { user } = props;
  return (
    //si user nombre exsite
    <div className="info-user">
      <h2 className="name">
        {user?.nombre} {user?.apellidos}
      </h2>
      <p className="email">{user?.email}</p>
      {user?.biografia && <div className="description">{user.biografia}</div>}
      <div className="more-info">
        {user?.ubicacion && ( // si user ubicacion existe renderiza un parrafo con el link y la ubicacion
          <p>
            <Location />
            {user.ubicacion}
          </p>
        )}
        {user?.sitioWeb && (
          <a
            href={user.sitioWeb}
            alt={user.sitioWeb}
            target="_blank" //este target es para que abre una nueva pestaña
            rel="noopener noreferrer"
          >
            <Link /> {user.sitioWeb}
          </a>
        )}
        {user?.fechaNacimiento && (
          <p>
            <DateBirth />
            {moment(user.fechaNacimiento)
              .locale("es", localization)
              .format("LL")}
          </p>
        )}
      </div>
    </div>
  );
}
