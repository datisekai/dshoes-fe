import React from "react";
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import CheckOut from '../../components/Checkout/checkout'

const CheckOutPage = () => {
  return (
    <>
      <Header />
        <CheckOut/>
      <Footer />
    </>
  );
};

export default CheckOutPage;
