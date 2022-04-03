import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import Footer from "../../components/Footer/Footer";
import Register from "../../components/Form/Register";
import Header from "../../components/Header/Header";

const RegisterPage = () => {
  const user = useSelector((state) => state.user);

  if (user && user.user) {
    return <Navigate   to={"/"} />;
  }

  return (
    <>
      <Header />
      <Register />
      <Footer />
    </>
  );
};

export default RegisterPage;
