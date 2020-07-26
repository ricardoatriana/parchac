import { useContext } from "react";
import { AuthContext } from "../utils/context";

export default () => useContext(AuthContext); //Con esto sacamos la info del AuthContext para usarlo en el LeftMenu 
