import React, { useState, useEffect } from "react";
import BasicLayout from "../../layout/BasicLayout";
import { Spinner, ButtonGroup, Button } from "react-bootstrap";
import { withRouter } from "react-router-dom";
import queryString from "query-string";
import { isEmpty } from "lodash";
import { useDebouncedCallback } from "use-debounce"; //esto es para el buscador espera a q el usuario deje de escribir para proceder a buscar
import ListUsers from "../../components/ListUsers";
import { getFollowsApi } from "../../api/follow";

import "./Users.scss";

function Users(props) {
  //el Basiclayout pide el checklogin asi q por destructuring se le pasa al componente BasicLayout
  //console.log(props); para verificar q llega checklogin
  const { setRefreshCheckLogin, location, history } = props;
  const [users, setUsers] = useState(null); //sera null porq al principio no tendremos usuarios
  const params = useUsersQuery(location); //busca location q tiene los parametros page, type, search
  //console.log(params);
  //console.console.log(queryString.stringify(params));// esto cambia el objeto de  a linea
  const [typeUser, setTypeUser] = useState(params.type || "follow"); //en caso q params.type no tiene valor entonces muestra follow
  const [btnLoading, setBtnLoading] = useState(false); //false porq al principio no sta buscando naada
  const [onSearch] = useDebouncedCallback((value) => {
    //esta func es para que espero 200 y pahi si busq
    setUsers(null);
    history.push({
      search: queryString.stringify({ ...params, search: value, page: 1 }),
    });
  }, 200);

  useEffect(() => {
    getFollowsApi(queryString.stringify(params)) // esto cambia el objeto en el que viene page, type y search a linea, haciendo q sea dinamica la url
      .then((response) => {
        //console.log(response);
        if (params.page == "1") {
          if (isEmpty(response)) {
            setUsers([]);
          } else {
            setUsers(response);
          }
        } else {
          if (!response) {
            //si response de cargar usuarios no tiene mas contendio setBtnLoading no traiga contenido
            setBtnLoading(0);
          } else {
            setUsers([...users, ...response]);
            setBtnLoading(false);
          }
        }
      })
      .catch(() => {
        setUsers([]);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location]);

  const onChangeType = (type) => {
    //es la q se ocupa de cambiar el type deusario q bscamos si es uno nuevo o uno q seguimos
    setUsers(null); //con esto borra los usuarios para volverlos a cargar
    if (type === "new") {
      setTypeUser("new");
    } else {
      setTypeUser("follow");
    }
    history.push({
      //esto hace q se le agregue a la URL lo de abajo, se actualice
      search: queryString.stringify({ type: type, page: 1, search: "" }),
    });
  };

  const moreData = () => {
    //console.log("Buscando Usuarios");
    setBtnLoading(true);
    const newPage = parseInt(params.page) + 1; //este parse convierte el string param a int
    history.push({
      search: queryString.stringify({ ...params, page: newPage }),
    });
  };

  return (
    <BasicLayout
      className="users"
      title="usuarios"
      setRefreshCheckLogin={setRefreshCheckLogin}
    >
      <div className="users__title">
        <h2>Usuarios</h2>
        <input
          type="text"
          placeholder="Busca un usuario"
          onChange={(e) => onSearch(e.target.value)}
          /*onChange={(e) =>  este era cuadno no se usaba el debounced
            history.push({
              search: queryString.stringify({
                ...params,
                search: e.target.value,
                page: 1,
              }),
            })
          }*/
        ></input>
      </div>

      <ButtonGroup className="users__options">
        <Button
          className={typeUser === "follow" && "active"}
          onClick={() => onChangeType("follow")}
        >
          Siguiendo
        </Button>
        <Button
          className={typeUser === "new" && "active"}
          onClick={() => onChangeType("new")}
        >
          Nuevos
        </Button>
      </ButtonGroup>

      {!users ? (
        <div className="users__loading">
          <Spinner animation="border" variant="info" />
          Buscando usuarios
        </div>
      ) : (
        //si no usaramos el fragment <> no podria devolver 2 componentes
        <>
          <ListUsers users={users} />
          <Button onClick={moreData} className="load-more">
            {!btnLoading ? (
              btnLoading !== 0 && "Cargar mas usuarios"
            ) : (
              <Spinner
                as="span"
                animation="grow"
                size="sm"
                role="status"
                aria-hidden="true"
              />
            )}
          </Button>
        </>
      )}
    </BasicLayout>
  );
}

function useUsersQuery(location) {
  //es un hook iterno
  const { page = 1, type = "follow", search = "" } = queryString.parse(
    location.search
  );
  return { page, type, search };
}

export default withRouter(Users);
