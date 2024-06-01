// src/components/ProtectedRoute.js

import { useContext, useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/authContext";

const ProtectedRoute = ({ children }) => {
  const {user} = useContext(AuthContext);
  return <>
  {user?children:<Navigate to={'/'}/>}
  </>;
};

export default ProtectedRoute;
