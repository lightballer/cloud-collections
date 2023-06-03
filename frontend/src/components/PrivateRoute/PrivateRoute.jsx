import React from "react";
import { Navigate } from "react-router-dom";

import { useStateValue } from "../../store/reducer";

const PrivateRoute = ({ redirectPath, children }) => {
  const { state } = useStateValue();

  if (!state.username) {
    return <Navigate to={redirectPath} replace />;
  }

  return children;
};

export default PrivateRoute;
