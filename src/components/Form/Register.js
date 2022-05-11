import React, { useEffect, useRef, useState } from "react";
import "../../assets/css/index.css";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import { base_auth } from "../../api/config";
import setHeaderAxios from "../../utils/setHeaderAxios";
import { useDispatch } from "react-redux";
import { setUser } from "../../redux/userReducer";
import { useQuery } from "../../customHook/useQuery";
import * as Yup from "yup";
import { useFormik } from "formik";
import Loading from "../Loading/Loading";

const Register = () => {
  const [load, setLoad] = useState(false);
  const dispatch = useDispatch();
  const queryParams = useQuery();
  const query = queryParams.get("productId");
  const action = queryParams.get("action");

  const emailRef = useRef();

  const formik = useFormik({
    initialValues: {
      email: "",
      phoneNumber: "",
      password: "",
      confirm: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .required("Required")
        .matches(
          /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i,
          "Must be the format email"
        ),
      phoneNumber: Yup.string()
        .required("Required")
        .matches(
          /\(?([0-9]{3})\)?([ .-]?)([0-9]{3})\2([0-9]{4})/,
          "Must be the format phone number"
        ),
      password: Yup.string()
        .required("Required")
        .min(6, "Must be more than 6 characters"),
      confirm: Yup.string()
        .required("Required")
        .oneOf([Yup.ref("password"), null], "Password must match"),
    }),
    onSubmit: async (values) => {
      try {
        setLoad(true);
        const res = await axios.post(`${base_auth}/register`, {
          email: values.email,
          password: values.password,
          phoneNumber: values.phoneNumber,
        });
        sessionStorage.setItem("token", res.data.token);
        setHeaderAxios(res.data.token);
        toast.success("Register successfull");
        getUser();
        query
          ? navigate(`/products/detail/${query}`)
          : action && action === "check-out"
          ? navigate("/check-out")
          : navigate("/");
      } catch (err) {
        err.response && toast.error(err.response.data.message);
      }
      setLoad(false);
    },
  });

  useEffect(() => {
    emailRef.current.focus();
  }, []);

  const getUser = async () => {
    try {
      const res = await axios.get(`${base_auth}/user`);
      dispatch(setUser({ userInfo: res.data.user, roles: res.data.rolesUser }));
    } catch (err) {
      console.log(err);
    }
  };

  const imgForm = [
    "https://media.istockphoto.com/photos/object-patternsneakers-picture-id1304862992?b=1&k=20&m=1304862992&s=170667a&w=0&h=Emf1s0oY7xw7HjOCloT7XHLXlkdznJ9Tve-l9FZWBBA=",
    "https://media.istockphoto.com/photos/stylish-storage-bench-with-different-pairs-of-shoes-near-beige-wall-picture-id1318603129?b=1&k=20&m=1318603129&s=170667a&w=0&h=SRidBAonrKLyu8fidBy-LZRe2iwHPgzmLrdMKvriIPk=",
    "https://media.istockphoto.com/photos/young-man-shopping-shoes-picture-id1292261872?b=1&k=20&m=1292261872&s=170667a&w=0&h=AA5F-5LPlJJjqpUqB5UjCuYhk5YnNEEcEAqa5Ya4lEA=",
    "https://media.istockphoto.com/photos/young-woman-runner-tying-her-shoes-preparing-for-a-jog-outside-at-picture-id1298108434?b=1&k=20&m=1298108434&s=170667a&w=0&h=6i76GZiEXBkow7bj3827YQwmLn-a1a7XXyogQHqq2jE=",
    "https://media.istockphoto.com/photos/white-sneaker-on-a-blue-gradient-background-mens-fashion-sport-shoe-picture-id1303978937?b=1&k=20&m=1303978937&s=170667a&w=0&h=az5Y96agxAdHt3XAv7PP9pThdiDpcQ3otWWn9YuJQRc=",
    "https://images.unsplash.com/photo-1549298916-b41d501d3772?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8c2hvZXN8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60",
  ];

  const [img, setImg] = useState("");

  useEffect(() => {
    setImg(imgForm[Math.floor(Math.random() * imgForm.length)]);
  }, []);

  const navigate = useNavigate();

  return (
    <div className='tw-min-h-[90vh] tw-bg-[#222222] tw-pt-10'>
      <div className='tw-bg-gray-100 tw-w-[90%] sm:tw-w-[80%] md:tw-w-[70%] tw-rounded-md tw-h-[600px] tw-mx-auto tw-flex tw-justify-between tw-items-center tw-relative'>
        <img
          src={img}
          alt=''
          className='md:tw-w-[50%] lg:tw-w-[60%] tw-hidden md:tw-block tw-rounded-md tw-h-full tw-object-cover'
        />
        <div className='tw-w-[100%] md:tw-w-[50%] lg:tw-w-[40%] tw-p-5'>
          <h1 className='tw-text-[#333] underlined-blue tw-text-xl'>
            WELCOME BACK
          </h1>
          <form onSubmit={formik.handleSubmit}>
            <div className='tw-mt-3'>
              <label htmlFor='email' className='tw-text-[#666]'>
                Email Address
              </label>
              <br />
              <input
                type='email'
                name='email'
                id='email'
                value={formik.values.email}
                ref={emailRef}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder='Ex: datly@gmail.com'
                className='tw-px-4 tw-py-1 tw-w-full tw-rounded-md tw-outline-none'
                required
              />
              <p className='tw-text-red-400'>
                {formik.errors.email &&
                  formik.touched.email &&
                  formik.errors.email}
              </p>
            </div>
            <div className='tw-mt-3'>
              <label htmlFor='password' className='tw-text-[#666]'>
                Phone Number
              </label>
              <br />
              <input
                type='text'
                name='phoneNumber'
                id='phoneNumber'
                value={formik.values.phoneNumber}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder='Ex: 0886249022'
                className='tw-px-4 tw-py-1 tw-w-full tw-rounded-md tw-outline-none'
                required
                maxLength={10}
                minLength={10}
              />
              <p className='tw-text-red-400'>
                {formik.errors.phoneNumber &&
                  formik.touched.phoneNumber &&
                  formik.errors.phoneNumber}
              </p>
            </div>
            <div className='tw-mt-3'>
              <label htmlFor='password' className='tw-text-[#666]'>
                Password
              </label>
              <br />
              <input
                type='password'
                name='password'
                id='password'
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder='Ex: datly1223'
                className='tw-px-4 tw-py-1 tw-w-full tw-rounded-md tw-outline-none'
                required
              />
              <p className='tw-text-red-400'>
                {formik.errors.password &&
                  formik.touched.password &&
                  formik.errors.password}
              </p>
            </div>

            <div className='tw-mt-3'>
              <label htmlFor='repeat' className='tw-text-[#666]'>
                Repeat Password
              </label>
              <br />
              <input
                type='password'
                name='confirm'
                id='confirm'
                value={formik.values.confirm}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder='Ex: datly1223'
                className='tw-px-4 tw-py-1 tw-w-full tw-rounded-md tw-outline-none'
                required
              />
              <p className='tw-text-red-400'>
                {formik.errors.confirm &&
                  formik.touched.confirm &&
                  formik.errors.confirm}
              </p>
            </div>

            <div className='tw-mt-3 tw-flex tw-flex-col md:tw-flex-row tw-justify-between'>
              <button
                type='submit'
                disabled={load ? true : false}
                className='tw-w-full md:tw-w-[49%] tw-text-md tw-bg-gradient-to-r tw-from-red-400 tw-to-blue-400 hover:tw-opacity-90 tw-text-gray-100 tw-rounded-md tw-px-5 tw-py-1  tw-transition-transform'
              >
                Create Account
              </button>
              <button
                className='tw-w-full tw-mt-2 md:tw-mt-0  md:tw-w-[49%] tw-text-md tw-rounded-md tw-px-5 md:tw-px-2 tw-bg-gradient-to-r tw-from-blue-400 tw-to-red-400 lg:tw-px-5 tw-py-1 tw-text-gray-100 hover:tw-opacity-90 tw-transition-transform'
                onClick={() =>
                  query
                    ? navigate(`/login?productId=${query}`)
                    : action && action === "check-out"
                    ? navigate("/login?action=check-out")
                    : navigate("/login")
                }
              >
                Login Now
              </button>
            </div>
          </form>
        </div>
        {load && <Loading />}
      </div>
    </div>
  );
};

export default Register;
