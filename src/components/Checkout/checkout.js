import axios from "axios";
import { useFormik } from "formik";
import React, { useEffect, useRef } from "react";
import NumberFormat from "react-number-format";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import swal from "sweetalert";
import * as Yup from "yup";
import { base_orders } from "../../api/config";
import "../../assets/css/index.css";
import {
  decreaseCart,
  increaseCart, removeCart, removeProduct
} from "../../redux/cartReducer";

const   Checkout = () => {
  const carts = useSelector((state) => state.cart.carts);
  const total = carts?.reduce((pre, cur) => pre + cur.prices * cur.quantify, 0);
  const dispatch = useDispatch();
  const nameCustomer = useRef();
  const user = useSelector((state) => state.user.user.userInfo);
  const navigate = useNavigate()

  const formik = useFormik({
    initialValues: {
      name: "",
      address: "",
      phoneNumber: "",
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .required("Required")
        .min(4, "Must be more than 4 characters"),
      address: Yup.string()
        .required("Required")
        .min(4, "Must be more than 4 characters"),
      phoneNumber: Yup.string()
        .required("Required")
        .matches(
          /\(?([0-9]{3})\)?([ .-]?)([0-9]{3})\2([0-9]{4})/,
          "Must be the format phone number"
        ),
    }),
    onSubmit: async (values) => {
      console.log(values);
      if(carts && carts.length > 0)
      {
        swal({
          title: "Are you sure?",
          text: `The amount to be paid is ${total} VND`,
          icon: "info",
          buttons: true,
          dangerMode: true,
        }).then(async (willDelete) => {
          if (willDelete) {
            const data = {
              sum: total,
              phoneNumber: values.phoneNumber,
              name: values.name,
              address: values.address,
              products: carts,
            };
            const order = await axios.post(`${base_orders}/customers`, data);
            dispatch(removeCart())
            toast.success("Create new order successfull!");
            navigate('/history-order')
          }
        });
      }else{
        toast.error('No products in your shopping cart!')
      }
    },
  });

  useEffect(() => {
    nameCustomer.current.focus();
  }, []);

  const handleDecrease = (item) => {
    if (item.quantify > 1) {
      dispatch(decreaseCart(item));
    }
  };
  const handleDelete = (item) => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this imaginary file!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        dispatch(removeProduct(item));
        toast.success("Delete successfull!");
      }
    });
  };
  return (
    <div className="min-h-screen bg-[#222]">
      <div className="max-w-[1200px] mx-auto flex flex-col justify-between md:flex-row ">
        <div className="w-full sm:w-[50%] md:w-[60%] lg:w-[70%] mt-5 p-5 bg-[#2a2a2a] border-r border-blue-900 rounded-tl-md rounded-bl-md">
          <h2 className="text-gray-100 text-lg capitalize underlined-blue">
            New Order
          </h2>
          <div>
            <form onSubmit={formik.handleSubmit}>
              <div className="mt-3">
                <label className="text-gray-200 text-md" htmlFor="">
                  Name customer
                </label>
                <input
                  name="name"
                  type="text"
                  className="block w-full rounded-md bg-[#222]  placeholder:text-gray-400 placeholder:text-md px-5 py-2 mt-1 outline-none text-gray-300"
                  placeholder="Ex: Thanh Dat"
                  autoComplete="off"
                  ref={nameCustomer}
                  value={formik.values.name}
                  onChange={formik.handleChange}
                />
                {formik.errors.name && (
                  <p className="text-red-400 text-md">{formik.errors.name}</p>
                )}
              </div>
              <div className="mt-3">
                <label className="text-gray-200 text-md" htmlFor="">
                  Email customer
                </label>
                <input
                  type="text"
                  className="block w-full rounded-md bg-[#222] placeholder:text-md px-5 py-2 mt-1 outline-none text-gray-300"
                  placeholder="Enter your name..."
                  readOnly
                  value={user?.email}
                />
              </div>
              <div className="mt-3">
                <label className="text-gray-200 text-md" htmlFor="">
                  Address customer
                </label>
                <input
                  type="text"
                  name="address"
                  autoComplete="off"
                  className="block w-full rounded-md bg-[#222]  placeholder:text-gray-400 placeholder:text-md px-5 py-2 mt-1 outline-none text-gray-300"
                  placeholder="Ex: 222 Vo Thanh Trang"
                  value={formik.values.address}
                  onChange={formik.handleChange}
                />
                {formik.errors.address && (
                  <p className="text-red-400 text-md">
                    {formik.errors.address}
                  </p>
                )}
              </div>
              <div className="mt-3">
                <label className="text-gray-200 text-md" htmlFor="">
                  Phone Number
                </label>
                <input
                  type="text"
                  name="phoneNumber"
                  autoComplete="off"
                  className="block w-full rounded-md bg-[#222]  placeholder:text-gray-400 placeholder:text-md px-5 py-2 mt-1 outline-none text-gray-300"
                  placeholder="Ex: 0886249022"
                  minLength={10}
                  maxLength={10}
                  value={formik.values.phoneNumber}
                  onChange={formik.handleChange}
                />
                {formik.errors.phoneNumber && (
                  <p className="text-red-400 text-md">
                    {formik.errors.phoneNumber}
                  </p>
                )}
              </div>
              <button
                type="submit"
                className="w-full px-5 py-2 text-md mt-3 bg-gradient-to-r from-red-400 to-blue-400 rounded-md capitalize text-gray-100 hover:opacity-80 transition-all"
              >
                Check Out
              </button>
            </form>
          </div>
        </div>
        <div className="w-full sm:w-[50%] md:w-[40%] lg:w-[30%] relative bg-[#2a2a2a] p-5 mt-5">
          <h2 className="text-gray-100 text-lg underlined-blue">Carts</h2>
          <div
            className="mt-3  max-h-[40vh] overflow-y-scroll py-2"
            id="cartsCheckout"
          >
            {carts?.map((item) => (
              <div className="mt-3" key={item._id}>
                <div className="flex flex-row items-center">
                  <img
                    className="w-[90px] h-[90px] rounded-md object-cover aspect-video"
                    alt=""
                    src={item.image}
                  />
                  <div className="px-2">
                    <h3 className="text-lg text-gray-100">{item.name}</h3>
                    <p className="text-gray-300 text-md">
                      <span className="capitalize">{item.color}</span> Shoes
                    </p>
                    <p className="text-gray-300 text-md">Size {item.size}</p>
                  </div>
                </div>
                <div className="mt-2 flex justify-between items-center">
                  <div className="flex items-center">
                    <i
                      onClick={() => dispatch(increaseCart(item))}
                      className="text-gray-300 px-1 py-1 hover:text-gray-100 transition-all cursor-pointer fa-solid fa-plus"
                    ></i>
                    <span className="text-gray-300 px-1 py-1">
                      {item.quantify}
                    </span>
                    <i
                      onClick={() => handleDecrease(item)}
                      className={`${
                        item.quantify === 1 && "opacity-50"
                      } text-gray-300 px-1 py-1 hover:text-gray-100 transition-all cursor-pointer fa-solid fa-minus`}
                    ></i>
                  </div>
                  <NumberFormat
                    className="w-[50%] bg-transparent text-gray-100 outline-none"
                    thousandSeparator={true}
                    suffix=" VND"
                    displayType="text"
                    value={item.prices}
                  />
                  <i
                    onClick={() => handleDelete(item)}
                    className="text-gray-300 px-1 py-1 hover:text-gray-100 transition-all cursor-pointer fa-solid fa-xmark"
                  ></i>
                </div>
              </div>
            ))}

            {(!carts || carts.length === 0) && <img className="w-full object-cover aspect-video" src="https://raw.githubusercontent.com/Ren0503/zenzen-js-share-video/master/client/src/assets/noresults.png"></img>}
          </div>
          <div className="mt-3 bg-gradient-to-r  py-2 from-red-400 to-violet-400 rounded-md border-t border-blue-900 px-2">
            <h2 className="uppercase text-md text-gray-100">Summary</h2>
            <div className="flex justify-between">
              <p className="text-md capitalize text-gray-200">Count</p>
              <p className="text-md capitalize text-gray-200">
                {carts?.length} Products
              </p>
            </div>
            <div className="flex justify-between">
              <p className="text-md capitalize text-gray-200">Total</p>
              <NumberFormat
                className="w-[50%] text-right bg-transparent text-gray-200 outline-none"
                thousandSeparator={true}
                suffix=" VND"
                displayType="text"
                value={total}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
