import React, { useState, useEffect } from "react"; //el resultado del effect lo guardamos dentro de un estado
import { Button, Spinner } from "react-bootstrap";
import BasicLayout from "../../layout/BasicLayout";
import ListParlas from "../../components/ListParlas";
import { getParlasFollowersApi } from "../../api/parla";

import "./Home.scss";
export default function Home(props) {
  const { setRefreshCheckLogin } = props;
  const [parlas, setParlas] = useState(null);
  const [page, setPage] = useState(1);
  const [loadingParlas, setLoadingParlas] = useState(false);

  useEffect(() => {
    getParlasFollowersApi(page)
      .then((response) => {
        // console.log(response);
        if (!parlas && response) {
          setParlas(formatModel(response));
          //si el estado parlas es nuo signiica q no ternmos ninguna parla
        } else {
          if (!response) {
            //en este caso response son las nuevas parlas
            setLoadingParlas(0); //con este se borra el boton pues el response no mas parlas
          } else {
            const data = formatModel(response);
            setParlas([...parlas, ...data]);
            setLoadingParlas(false); //Se apaga el boton porq ya ha encontrado las parlas
          }
        }
      })
      .catch(() => {});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  const moreData = () => {
    setLoadingParlas(true);
    setPage(page + 1);
  };

  return (
    <BasicLayout className="home" setRefreshCheckLogin={setRefreshCheckLogin}>
      <div className="name__title">
        <h2>Inicio</h2>
      </div>
      {parlas && <ListParlas parlas={parlas} />}
      <Button onClick={moreData} className="load-more">
        {!loadingParlas ? (
          loadingParlas !== 0 ? (
            "Obtener mas Parlas"
          ) : (
            "No hay mas parlas"
          )
        ) : (
          <Spinner
            as="span"
            aimation="grow"
            size="sm"
            role="status"
            aria-hidden="true"
          />
        )}
      </Button>
    </BasicLayout> //Si parlas tiene contenido entonces pasa el componente
  );
}

function formatModel(parlas) {
  //esta func modelo sera enviada a ListParlas para ser modelada de la manera en constparla
  const parlasTemp = [];
  parlas.forEach((parla) => {
    //console.log(parla);
    parlasTemp.push({
      _id: parla._id,
      userId: parla.userRelationID,
      mensaje: parla.Parla.mensaje,
      fecha: parla.Parla.fecha,
    });
  });
  //console.log(parlasTemp);
  return parlasTemp;
}
