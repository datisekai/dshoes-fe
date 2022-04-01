import axios from "axios";
import { Suspense, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";
import { toast } from "react-toastify";
import { base_auth, base_products } from "./api/config";
import "./App.css";
import Loading from "./components/Loading/Loading";
import Modal from "./components/Modal/Modal";
import TopLoading from "./components/TopLoading/TopLoading";
import CartPage from "./pages/Cart/CartPage";
import CheckOutPage from "./pages/CheckOutPage/CheckOutPage";
import ContactPage from "./pages/Contact/ContactPage";
import DetailPage from "./pages/Detail/DetailPage";
import ErrorPage from "./pages/ErrorPage/ErrorPage";
import Home from "./pages/Home/Home";
import LoginPage from "./pages/Login/LoginPage";
import Menu from "./pages/Menu/Menu";
import DetailOrderPage from "./pages/Order/DetailOrderPage";
import OrderPage from "./pages/Order/OrderPage";
import RegisterPage from "./pages/Register/RegisterPage";
import SearchPage from "./pages/Search/SearchPage";
import { setType } from "./redux/typeReducer";
import { setUser } from "./redux/userReducer";
import PrivateRoute from "./utils/PrivateRoute";
import setHeaderAxios from "./utils/setHeaderAxios";

function App() {
  const dispatch = useDispatch();
  const user = useSelector(state => state.user.user)

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

  
  useEffect(() => {
    getTypes();
  }, []);
  
  const getTypes = async () => {
    try {
      const res = await axios.get(
        `${base_products}/types/all`
        );
        dispatch(setType(res.data.types));
      } catch (err) {
        err.response && toast(err.response.message);
      }
    };
    
    if(sessionStorage.getItem('token') &&typeof user === 'undefined') return <Loading/>


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
          <Route path="/check-out" element={<PrivateRoute><CheckOutPage /></PrivateRoute>}></Route>
          <Route path="/history-order" element={<PrivateRoute><OrderPage/></PrivateRoute>}></Route>
          <Route path="/history-order/:id" element={<PrivateRoute><DetailOrderPage/></PrivateRoute>}></Route>
          <Route path="*" element={<ErrorPage/>}></Route>
        </Routes>
      </Suspense>
      <Modal />
    </div>
  );
}

export default App;
