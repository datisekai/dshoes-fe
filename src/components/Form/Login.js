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
import Loading from "../Loading/Loading";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const queryParams = useQuery();
  const query = queryParams.get("productId");
  const action = queryParams.get("action");

  const emailRef = useRef();
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
        query
          ? navigate(`/products/detail/${query}`)
          : action && action === "check-out"
          ? navigate("/check-out")
          : navigate("/");
      } catch (err) {
        err && toast.error(err.response.data.message);
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
    <div className='tw-min-h-[90vh] tw-bg-[#222222] tw-pt-10'>
      <div className='tw-bg-gray-100 tw-w-[90%] sm:tw-w-[80%] md:tw-w-[70%] tw-rounded-md tw-h-[500px] tw-mx-auto tw-flex tw-justify-between tw-items-center tw-relative'>
        <img
          src={img}
          alt=''
          className='md:tw-w-[50%] lg:tw-w-[60%] tw-hidden md:tw-block tw-rounded-md tw-h-full tw-object-cover'
        />
        <div className='tw-w-[100%] md:tw-w-[50%] lg:tw-w-[40%] tw-p-5'>
          <h1 className='tw-text-[#333] underlined-blue tw-text-xl'>
            WELCOME BACK
          </h1>
          <form onSubmit={handleLogin}>
            <div className='tw-mt-3'>
              <label htmlFor='email' className='tw-text-[#666]'>
                Email Address
              </label>
              <br />
              <input
                ref={emailRef}
                type='email'
                name=''
                id='email'
                value={email}
                placeholder='Ex: datly@gmail.com'
                onChange={(e) => setEmail(e.target.value)}
                className='tw-px-4 tw-py-1 tw-w-full tw-rounded-md tw-outline-none'
                required
              />
            </div>
            <div className='tw-mt-3'>
              <label htmlFor='password' className='tw-text-[#666]'>
                Password
              </label>
              <br />
              <input
                type='password'
                name=''
                value={password}
                id='password'
                onChange={(e) => setPassword(e.target.value)}
                placeholder='Ex: datly1223'
                className='tw-px-4 tw-py-1 tw-w-full tw-rounded-md tw-outline-none'
                required
              />
            </div>

            <div className='tw-mt-3 tw-flex tw-flex-col md:tw-flex-row tw-justify-between'>
              <button
                disabled={loading ? true : false}
                type='submit'
                className='tw-w-full md:tw-w-[49%] tw-text-md tw-bg-gradient-to-r tw-from-blue-400 tw-to-red-400 hover:tw-opacity-90 tw-rounded-md tw-px-5 md:tw-px-2 lg:tw-px-5 tw-py-1 tw-text-gray-100 tw-transition-transform'
              >
                Login Now
              </button>
              <button
                className='tw-w-full tw-mt-2 md:tw-mt-0 md:tw-w-[49%] tw-text-md tw-bg-gradient-to-r tw-from-red-400 tw-to-blue-400 hover:tw-opacity-90 tw-text-gray-100 tw-rounded-md tw-px-5 tw-py-1  transition-transform'
                onClick={() =>
                  query
                    ? navigate(`/register?productId=${query}`)
                    : action && action === "check-out"
                    ? navigate("/register?action=check-out")
                    : navigate("/register")
                }
              >
                Create Account
              </button>
            </div>
          </form>

          <div className='tw-mt-3'>
            <p className='tw-text-[#888] tw-text-sm'>Login with social</p>
            <div className='tw-flex tw-justify-start'>
              <i className='tw-text-3xl tw-px-1 tw-cursor-pointer tw-text-[#007bff] fa-brands fa-facebook'></i>
              <i className='tw-text-3xl tw-px-1 tw-cursor-pointer tw-text-red-400 fa-brands fa-google-plus-square'></i>
              <i className='tw-text-3xl tw-px-1 tw-cursor-pointer fa-brands fa-github-square'></i>
            </div>
          </div>
        </div>
        {loading && <Loading />}
      </div>
    </div>
  );
};

export default Login;
