import React from "react";
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";

const PrivateAdmin = ({ children }) => {
  const user = useSelector((state) => state.user);

  if (user && user.user && user.user.roles.length < 3) {
    return <Navigate to={`/`} />;
  } 

  if(user && !user.user)
  {
    return <Navigate to={`/login`} />;
  }

  return <>{children}</>;
};

export default PrivateAdmin;
