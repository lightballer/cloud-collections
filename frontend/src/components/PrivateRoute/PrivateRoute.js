import React from "react";
import { Navigate } from "react-router-dom";

import useAuth from "../../useAuth";

const PrivateRoute = ({ redirectPath, children }) => {
  const isAuthenticated = useAuth();

  if (!isAuthenticated) {
    return <Navigate to={redirectPath} replace />;
  }

  return children;
};

export default PrivateRoute;
