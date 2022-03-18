import axios from "axios";
import { lazy, Suspense, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Routes } from "react-router-dom";
import { base_auth } from "./api/config";
import "./App.css";
import Modal from "./components/Modal/Modal";
import TopLoading from "./components/TopLoading/TopLoading";
import Menu from "./pages/Menu/Menu";
import { setUser } from "./redux/userReducer";
import setHeaderAxios from "./utils/setHeaderAxios";
const Home = lazy(() => import("./pages/Home/Home"));
const SearchPage = lazy(() => import("./pages/Search/SearchPage"));
const RegisterPage = lazy(() => import("./pages/Register/RegisterPage"));
const DetailPage = lazy(() => import("./pages/Detail/DetailPage"));
const ContactPage = lazy(() => import("./pages/Contact/ContactPage"));
const CartPage = lazy(() => import("./pages/Cart/CartPage"));
const LoginPage = lazy(() => import("./pages/Login/LoginPage"));

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    if (sessionStorage.getItem("token")) {
      const token = sessionStorage.getItem("token");
      setHeaderAxios(token);
      getUser();
    }
  }, []);

  const getUser = async () => {
    try {
      const res = await axios.get(`${base_auth}/user`);
      dispatch(setUser({ userInfo: res.data.user, roles: res.data.rolesUser }));
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="App">
      <Suspense fallback={<TopLoading />}>
        <Routes>
          <Route exact path="/" element={<Home />}></Route>
          <Route path="/search" element={<SearchPage />}></Route>
          <Route path="/login" element={<LoginPage />}></Route>
          <Route path="/cart" element={<CartPage />}></Route>
          <Route path="/contact" element={<ContactPage />}></Route>
          <Route path="/detail/:id" element={<DetailPage />}></Route>
          <Route path="/register" element={<RegisterPage />}></Route>
          <Route path="/products/:type" element={<Menu />}></Route>
          <Route path="/products" element={<Menu />}></Route>
        </Routes>
      </Suspense>
      <Modal />
    </div>
  );
}

export default App;
