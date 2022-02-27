import Header from "./components/Header/Header";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import Menu from "./pages/Menu/Menu";
import SearchPage from "./pages/Search/SearchPage";
import LoginPage from "./pages/Login/LoginPage";
import RegisterPage from "./pages/Register/RegisterPage";
import DetailPage from "./pages/Detail/DetailPage";
import CartPage from "./pages/Cart/CartPage";
import ContactPage from "./pages/Contact/ContactPage";
import Modal from "./components/Modal/Modal";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route exact path="/" element={<Home />}></Route>
        <Route path="/search" element={<SearchPage />}></Route>
        <Route path="/login" element={<LoginPage />}></Route>
        <Route path="/cart" element={<CartPage   />}></Route>
        <Route path="/contact" element={<ContactPage   />}></Route>
        <Route path="/detail/:id" element={<DetailPage />}></Route>
        <Route path="/register" element={<RegisterPage />}></Route>
        <Route path="/:type" element={<Menu />}></Route>
      </Routes>
      <Modal/>
    </div>
  );
}

export default App;
