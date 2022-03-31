import React from "react";
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const user = useSelector((state) => state.user.user.userInfo);

  if (!user) {
    return <Navigate to={`/login`} />;
  } 

  return <>{children}</>;
};

export default PrivateRoute;
