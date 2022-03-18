import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { Hypnosis } from "react-cssfx-loading";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { base_auth } from "../../api/config";
import "../../assets/css/index.css";
import { setUser } from "../../redux/userReducer";
import setHeaderAxios from "../../utils/setHeaderAxios";
import { checkEmail } from "../../utils/Validate";
import { useQuery } from "../../customHook/useQuery";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const queryParams = useQuery();
  const query = queryParams.get("productId");

  const emailRef = useRef();

  useEffect(() => {
    emailRef.current.focus();
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!checkEmail(email)) {
      toast.error("Sai định dạng email!");
      emailRef.current.focus();
    } else {
      try {
        setLoading(true);
        const res = await axios.post(`${base_auth}/login`, { email, password });
        sessionStorage.setItem("token", res.data.token);
        setHeaderAxios(res.data.token);
        toast.success("Login successfull");
        getUser();
        query ? navigate(`/detail/${query}`) : navigate("/");
      } catch (err) {
        toast.error(err.response.data.message);
      }
      setLoading(false);
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
          <form onSubmit={handleLogin}>
            <div className="mt-3">
              <label htmlFor="email" className="text-[#666]">
                Email Address
              </label>
              <br />
              <input
                ref={emailRef}
                type="text"
                name=""
                id="email"
                value={email}
                placeholder="Ex: datly@gmail.com"
                onChange={(e) => setEmail(e.target.value)}
                className="px-4 py-1 w-full rounded-md"
                required
              />
            </div>
            <div className="mt-3">
              <label htmlFor="password" className="text-[#666]">
                Password
              </label>
              <br />
              <input
                type="password"
                name=""
                value={password}
                id="password"
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Ex: datly1223"
                className="px-4 py-1 w-full rounded-md"
                required
              />
            </div>

            <div className="mt-3 flex flex-col md:flex-row justify-between">
              <button
                disabled={loading ? true : false}
                type="submit"
                className="w-full md:w-[49%] text-md bg-gradient-to-r from-blue-400 to-red-400 hover:opacity-90 rounded-md px-5 md:px-2 lg:px-5 py-1 text-gray-100 transition-transform"
              >
                Login Now
              </button>
              <button
                className="w-full mt-2 md:mt-0 md:w-[49%] text-md bg-gradient-to-r from-red-400 to-blue-400 hover:opacity-90 text-gray-100 rounded-md px-5 py-1  transition-transform"
                onClick={() =>
                  query ? navigate(`/register?productId=${query}`) : navigate("/register")
                }
              >
                Create Account
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
        {loading && (
          <div className="fixed top-0 bottom-0 left-0 right-0 flex justify-center items-center overlay">
            <Hypnosis
              color="#FF0000"
              width="70px"
              height="70px"
              duration="3s"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Login;
