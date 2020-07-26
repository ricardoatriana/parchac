import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { map } from "lodash"; //el map para hacer un bucle para recorrer la configuracion de configRouting
import configRouting from "./configRouting";

export default function Routing(props) {
  const { setRefreshCheckLogin } = props;
  return (
    //el Switch sirve para q cuando encuntre la pagina q estaba buscando para cargar para y la carga, sino se le pusiera switch buscaria y mostrari odas las paginas parecidas a la ruta q estemos entrando
    <Router>
      <Switch>
        {map(configRouting, (route, index) => (
          <Route key={index} path={route.path} exact={route.exact}>
            <route.page setRefreshCheckLogin={setRefreshCheckLogin} />
          </Route>
        ))}
      </Switch>
    </Router>
  );
}
