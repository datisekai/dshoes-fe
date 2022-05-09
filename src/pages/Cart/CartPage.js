import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import uuid from "react-uuid";
import swal from "sweetalert";
import Bag from "../../components/Cart/Bag";
import Sumary from "../../components/Cart/Sumary";
import Shoes from "../../components/ContentHome/Shoes";
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import {
  decreaseCart,
  increaseCart,
  removeProduct,
} from "../../redux/cartReducer";

const CartPage = () => {
  const dispatch = useDispatch();

  const carts = useSelector((state) => state.cart.carts);

  const handleAdd = (product) => {
    dispatch(increaseCart(product));
  };

  const handleMinus = (product) => {
    if (product.quantify > 1) {
      dispatch(decreaseCart(product));
    }
  };

  const handleDelete = (product) => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this imaginary file!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        dispatch(removeProduct(product));
        toast.success("Delete successfull!");
      }
    });
  };

  return (
    <>
      <Header />
      <div className='tw-min-h-screen tw-relative tw-bg-[#222222]'>
        <div className='tw-max-w-[1200px] tw-mx-auto tw-flex tw-flex-col md:tw-flex-row tw-p-5'>
          <Bag
            carts={carts}
            handleAdd={handleAdd}
            handleMinus={handleMinus}
            handleDelete={handleDelete}
          />
          <Sumary carts={carts} />
        </div>
      </div>
      <Footer />
    </>
  );
};

export default CartPage;
