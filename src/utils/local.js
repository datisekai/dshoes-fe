import { logo } from "../config/base";

export const setLocal = (product) => {
  const recently = localStorage.getItem("recently")
    ? JSON.parse(localStorage.getItem("recently"))
    : [];

  const exist = recently.some((item) => item.product._id === product.product._id);

  !exist &&
    localStorage.setItem("recently", JSON.stringify([...recently, product]));
};

export const getLocal = () => {
  return localStorage.getItem("recently")
    ? JSON.parse(localStorage.getItem("recently"))
    : [];
};
