import React, { useEffect, useRef, useState } from "react";
import "../../assets/css/index.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";
import { checkEmail, checkMatch, checkPhone } from "../../utils/Validate";
import { toast } from "react-toastify";
import axios from "axios";
import { base_auth } from "../../api/config";
import setHeaderAxios from "../../utils/setHeaderAxios";
import { useDispatch } from "react-redux";
import { setUser } from "../../redux/userReducer";
import { FlippingSquare } from "react-cssfx-loading/lib";
import { useQuery } from "../../customHook/useQuery";

const Register = () => {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [rep, setRep] = useState("");
  const [phone, setPhone] = useState("");
  const [load, setLoad] = useState(false);
  const dispatch = useDispatch();
  const queryParams = useQuery()
  const query = queryParams.get("productId");

  const emailRef = useRef();

  useEffect(() => {
    emailRef.current.focus();
  }, []);

  const handleRegister = async (e) => {
    e.preventDefault();
    if (!checkEmail(email) || !checkPhone(phone)) {
      toast.error("Sai định dang email or phone!");
    } else if (!checkMatch(pass, rep)) {
      toast.error("Password và repeat không trùng nhau!");
    } else {
      try {
        setLoad(true);
        const res = await axios.post(`${base_auth}/register`, {
          email,
          password: pass,
          phoneNumber: phone,
        });
        sessionStorage.setItem("token", res.data.token);
        setHeaderAxios(res.data.token);
        toast.success("Register successfull");
        getUser();
        query ? navigate(`/detail/${query}`) : navigate("/");
      } catch (err) {
        err.response && toast.error(err.response.data.message);
      }
      setLoad(false);
    }
  };

  const getUser = async () => {
    try {
      const res = await axios.get(`${base_auth}/user`);
      dispatch(setUser({ userInfo: res.data.user, roles: res.data.rolesUser }));
    } catch (err) {
      console.log(err);
    }
  };

  const navigate = useNavigate();

  return (
    <div className="min-h-[90vh] bg-[#222222] pt-10">
      <div className="bg-gray-100 w-[90%] sm:w-[80%] md:w-[70%] rounded-md h-[500px] mx-auto flex justify-between items-center relative">
        <img
          src="https://prices.vn/photos/8/blog/review-giay-nike-nam.jpg"
          alt=""
          className="md:w-[50%] lg:w-[60%] hidden md:block rounded-md h-full object-cover"
        />
        <div className="w-[100%] md:w-[50%] lg:w-[40%] p-5">
          <h1 className="text-[#333] underlined-blue text-xl">WELCOME BACK</h1>
          <form onSubmit={handleRegister}>
            <div className="mt-3">
              <label htmlFor="email" className="text-[#666]">
                Email Address
              </label>
              <br />
              <input
                type="text"
                name=""
                id="email"
                value={email}
                ref={emailRef}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Ex: datly@gmail.com"
                className="px-4 py-1 w-full rounded-md"
                required
              />
            </div>
            <div className="mt-3">
              <label htmlFor="password" className="text-[#666]">
                Phone Number
              </label>
              <br />
              <input
                type="text"
                name=""
                id="password"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Ex: 0886249022"
                className="px-4 py-1 w-full rounded-md"
                required
                maxLength={10}
                minLength={10}
              />
            </div>
            <div className="mt-3">
              <label htmlFor="password" className="text-[#666]">
                Password
              </label>
              <br />
              <input
                type="text"
                name=""
                id="password"
                value={pass}
                onChange={(e) => setPass(e.target.value)}
                placeholder="Ex: datly1223"
                className="px-4 py-1 w-full rounded-md"
                required
              />
            </div>

            <div className="mt-3">
              <label htmlFor="repeat" className="text-[#666]">
                Repeat Password
              </label>
              <br />
              <input
                type="text"
                name=""
                id="repeat"
                value={rep}
                onChange={(e) => setRep(e.target.value)}
                placeholder="Ex: datly1223"
                className="px-4 py-1 w-full rounded-md"
                required
              />
            </div>

            <div className="mt-3 flex flex-col md:flex-row justify-between">
              <button
                type="submit"
                disabled={load ? true : false}
                className="w-full md:w-[49%] text-md bg-gradient-to-r from-red-400 to-blue-400 hover:opacity-90 text-gray-100 rounded-md px-5 py-1  transition-transform"
              >
                Create Account
              </button>
              <button
                className="w-full mt-2 md:mt-0  md:w-[49%] text-md rounded-md px-5 md:px-2 bg-gradient-to-r from-blue-400 to-red-400 lg:px-5 py-1 text-gray-100 hover:opacity-90 transition-transform"
                onClick={() => query ? navigate(`/login?productId=${query}`) : navigate('/login')}
              >
                Login Now
              </button>
            </div>
          </form>

          <div className="mt-3">
            <p className="text-[#888] text-sm">Login with social</p>
            <div className="flex justify-start">
              <i className="text-3xl px-1 cursor-pointer text-[#007bff] fa-brands fa-facebook"></i>
              <i className="text-3xl px-1 cursor-pointer text-red-400 fa-brands fa-google-plus-square"></i>
              <i className="text-3xl px-1 cursor-pointer fa-brands fa-github-square"></i>
            </div>
          </div>
        </div>
        {load && (
          <div className="absolute top-[40%] left-[35%] md:left-[50%]">
            <FlippingSquare
              color="#00F95E"
              width="100px"
              height="100px"
              duration="2s"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Register;
