import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import ContentHome from "../../components/ContentHome/ContentHome";
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import { scrollTop } from "../../utils/ScrollTop";

const Home = () => {
  useEffect(() => {
    scrollTop();
  }, []);
  return (
    <>
      <Header />
      <ContentHome />
      <Footer />
    </>
  );
};

export default Home;
