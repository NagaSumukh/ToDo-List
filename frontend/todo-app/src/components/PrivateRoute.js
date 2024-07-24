import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const PrivateRoute = ({ children }) => {
  const { authData } = useContext(AuthContext);
  return authData ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
