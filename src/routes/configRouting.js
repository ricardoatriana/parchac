import Home from "../page/Home";
import Error404 from "../page/Error404";
import User from "../page/User";
import Users from "../page/Users";

export default [
  //el orden es importante, el dinamico siempre tiene q ir al final tiene q ver con switch en routing, el switch hace q todas las paginas no se rendericen al mismo tiempo
  {
    path: "/users", //asi la ruta es dinamica
    exact: true,
    page: Users,
  },
  {
    path: "/:id", //asi la ruta es dinamica
    exact: true,
    page: User,
  },
  {
    path: "/",
    exact: true,
    page: Home,
  },
  {
    path: "*", // Si le da una cosa diferente Home da error404
    page: Error404,
  },
];
