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
  increaseCart,
  removeCart,
  removeProduct,
} from "../../redux/cartReducer";

const Checkout = () => {
  const carts = useSelector((state) => state.cart.carts);
  const total = carts?.reduce((pre, cur) => pre + cur.prices * cur.quantify, 0);
  const dispatch = useDispatch();
  const nameCustomer = useRef();
  const user = useSelector((state) => state.user.user.userInfo);
  const navigate = useNavigate();

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
      if (carts && carts.length > 0) {
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
            dispatch(removeCart());
            toast.success("Create new order successfull!");
            navigate("/history-order");
          }
        });
      } else {
        toast.error("No products in your shopping cart!");
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
    <div className='tw-min-h-screen tw-bg-[#222]'>
      <div className='tw-max-w-[1200px] tw-mx-auto tw-flex tw-flex-col tw-justify-between md:tw-flex-row '>
        <div className='tw-w-full sm:tw-w-[50%] md:tw-w-[60%] lg:tw-w-[70%] tw-mt-5 tw-p-5 tw-bg-[#2a2a2a] tw-border-r tw-border-blue-900 tw-rounded-tl-md tw-rounded-bl-md'>
          <h2 className='tw-text-gray-100 tw-text-lg tw-capitalize underlined-blue'>
            New Order
          </h2>
          <div>
            <form onSubmit={formik.handleSubmit}>
              <div className='tw-mt-3'>
                <label className='tw-text-gray-200 tw-text-md' htmlFor=''>
                  Name customer
                </label>
                <input
                  name='name'
                  type='text'
                  className='tw-block tw-w-full tw-rounded-md tw-bg-[#222]  placeholder:tw-text-gray-400 placeholder:tw-text-md tw-px-5 tw-py-2 tw-mt-1 tw-outline-none tw-text-gray-300'
                  placeholder='Ex: Thanh Dat'
                  autoComplete='off'
                  ref={nameCustomer}
                  value={formik.values.name}
                  onChange={formik.handleChange}
                />
                {formik.errors.name && (
                  <p className='tw-text-red-400 tw-text-md'>
                    {formik.errors.name}
                  </p>
                )}
              </div>
              <div className='tw-mt-3'>
                <label className='tw-text-gray-200 tw-text-md' htmlFor=''>
                  Email customer
                </label>
                <input
                  type='text'
                  className='tw-block tw-w-full tw-rounded-md tw-bg-[#222] placeholder:tw-text-md tw-px-5 tw-py-2 tw-mt-1 tw-outline-none tw-text-gray-300'
                  placeholder='Enter your name...'
                  readOnly
                  value={user?.email}
                />
              </div>
              <div className='tw-mt-3'>
                <label className='tw-text-gray-200 tw-text-md' htmlFor=''>
                  Address customer
                </label>
                <input
                  type='text'
                  name='address'
                  autoComplete='off'
                  className='tw-block tw-w-full tw-rounded-md tw-bg-[#222]  placeholder:tw-text-gray-400 placeholder:tw-text-md tw-px-5 tw-py-2 tw-mt-1 tw-outline-none tw-text-gray-300'
                  placeholder='Ex: 222 Vo Thanh Trang'
                  value={formik.values.address}
                  onChange={formik.handleChange}
                />
                {formik.errors.address && (
                  <p className='tw-text-red-400 tw-text-md'>
                    {formik.errors.address}
                  </p>
                )}
              </div>
              <div className='tw-mt-3'>
                <label className='tw-text-gray-200 tw-text-md' htmlFor=''>
                  Phone Number
                </label>
                <input
                  type='text'
                  name='phoneNumber'
                  autoComplete='off'
                  className='tw-block tw-w-full tw-rounded-md tw-bg-[#222]  placeholder:tw-text-gray-400 placeholder:tw-text-md tw-px-5 tw-py-2 tw-mt-1 tw-outline-none tw-text-gray-300'
                  placeholder='Ex: 0886249022'
                  minLength={10}
                  maxLength={10}
                  value={formik.values.phoneNumber}
                  onChange={formik.handleChange}
                />
                {formik.errors.phoneNumber && (
                  <p className='tw-text-red-400 tw-text-md'>
                    {formik.errors.phoneNumber}
                  </p>
                )}
              </div>
              <button
                type='submit'
                className='tw-w-full tw-px-5 tw-py-2 tw-text-md tw-mt-3 tw-bg-gradient-to-r tw-from-red-400 tw-to-blue-400 tw-rounded-md tw-capitalize tw-text-gray-100 hover:tw-opacity-80 tw-transition-all'
              >
                Check Out
              </button>
            </form>
          </div>
        </div>
        <div className='tw-w-full sm:tw-w-[50%] md:tw-w-[40%] lg:tw-w-[30%] tw-relative tw-bg-[#2a2a2a] tw-p-5 tw-mt-5'>
          <h2 className='tw-text-gray-100 tw-text-lg underlined-blue'>Carts</h2>
          <div
            className='tw-mt-3  tw-max-h-[40vh] tw-overflow-y-scroll tw-py-2'
            id='cartsCheckout'
          >
            {carts?.map((item) => (
              <div className='tw-mt-3' key={item._id}>
                <div className='tw-flex tw-flex-row tw-items-center'>
                  <img
                    className='tw-w-[90px] tw-h-[90px] tw-rounded-md tw-object-cover tw-aspect-video'
                    alt=''
                    src={item.image}
                  />
                  <div className='tw-px-2'>
                    <h3 className='tw-text-lg tw-text-gray-100'>{item.name}</h3>
                    <p className='tw-text-gray-300 tw-text-md'>
                      <span className='tw-capitalize'>{item.color}</span> Shoes
                    </p>
                    <p className='tw-text-gray-300 tw-text-md'>
                      Size {item.size}
                    </p>
                  </div>
                </div>
                <div className='tw-mt-2 tw-flex tw-justify-between tw-items-center'>
                  <div className='tw-flex tw-items-center'>
                    <i
                      onClick={() => dispatch(increaseCart(item))}
                      className='tw-text-gray-300 tw-px-1 tw-py-1 hover:tw-text-gray-100 tw-transition-all tw-cursor-pointer fa-solid fa-plus'
                    ></i>
                    <span className='tw-text-gray-300 tw-px-1 tw-py-1'>
                      {item.quantify}
                    </span>
                    <i
                      onClick={() => handleDecrease(item)}
                      className={`${
                        item.quantify === 1 && "tw-opacity-50"
                      } tw-text-gray-300 tw-px-1 tw-py-1 hover:tw-text-gray-100 tw-transition-all tw-cursor-pointer fa-solid fa-minus`}
                    ></i>
                  </div>
                  <NumberFormat
                    className='tw-w-[50%] tw-bg-transparent tw-text-gray-100 tw-outline-none'
                    thousandSeparator={true}
                    suffix=' VND'
                    displayType='text'
                    value={item.prices}
                  />
                  <i
                    onClick={() => handleDelete(item)}
                    className='tw-text-gray-300 tw-px-1 tw-py-1 hover:tw-text-gray-100 tw-transition-all tw-cursor-pointer fa-solid fa-xmark'
                  ></i>
                </div>
              </div>
            ))}

            {(!carts || carts.length === 0) && (
              <img
                className='tw-w-full tw-object-cover tw-aspect-video'
                src='https://raw.githubusercontent.com/Ren0503/zenzen-js-share-video/master/client/src/assets/noresults.png'
              ></img>
            )}
          </div>
          <div className='tw-mt-3 tw-bg-gradient-to-r  tw-py-2 tw-from-red-400 tw-to-violet-400 tw-rounded-md tw-border-t tw-border-blue-900 tw-px-2'>
            <h2 className='tw-uppercase tw-text-md tw-text-gray-100'>
              Summary
            </h2>
            <div className='tw-flex tw-justify-between'>
              <p className='tw-text-md tw-capitalize tw-text-gray-200'>Count</p>
              <p className='tw-text-md tw-capitalize tw-text-gray-200'>
                {carts?.length} Products
              </p>
            </div>
            <div className='tw-flex tw-justify-between'>
              <p className='tw-text-md tw-capitalize tw-text-gray-200'>Total</p>
              <NumberFormat
                className='tw-w-[50%] tw-text-right tw-bg-transparent tw-text-gray-200 tw-outline-none'
                thousandSeparator={true}
                suffix=' VND'
                displayType='text'
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
