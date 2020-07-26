import React from "react";
import { map, isEmpty } from "lodash"; //por si no encuentra nada isEmpty
import User from "./User";

import "./ListUsers.scss";

export default function ListUsers(props) {
  const { users } = props;
  //console.log(props);con el fin de comprobar si llego los usuarios
  if (isEmpty(users)) {
    return <h2>No hay resultados</h2>;
  }
  return (
    // ul significa lista, y map se lee; recorre users y por cada iteracion va a leer los datos de user
    <ul className="list-users">
      {map(users, (user) => (
        /*<h2 key={user.id}>
          {user.nombre} {user.apellido}
        </h2>*/
        <User key={user.id} user={user} />
      ))}
    </ul>
  );
}
