import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  carts: localStorage.getItem(`cart`)
    ? JSON.parse(localStorage.getItem(`cart`))
    : [],
};

const cartReducer = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const { carts } = { ...state };
      const isFoundProduct =
        carts &&
        carts.some(
          (item) =>
            item.productId === action.payload.productId &&
            item.size === action.payload.size &&
            item.color === action.payload.color
        );
      if (isFoundProduct) {
        const newCart = carts.map((item) => {
          if (
            item.productId === action.payload.productId &&
            item.size === action.payload.size &&
            item.color === action.payload.color
          ) {
            return { ...item, quantify: item.quantify + 1 };
          }
          return item;
        });
        localStorage.setItem("cart", JSON.stringify(newCart));
        return { ...state, carts: newCart };
      }
      localStorage.setItem("cart", JSON.stringify([...carts, action.payload]));
      return { ...state, carts: [...state.carts, action.payload] };
    },
    increaseCart: (state, action) => {
      const { carts } = { ...state };

      const newCart = carts.map((item) => {
        if (
          item.productId === action.payload.productId &&
          item.size === action.payload.size &&
          item.color === action.payload.color
        ) {
          return { ...item, quantify: item.quantify + 1 };
        }
        return item;
      });
      localStorage.setItem("cart", JSON.stringify(newCart));
      return { ...state, carts: newCart };
    },
    decreaseCart: (state, action) => {
      const { carts } = { ...state };

      const newCart = carts.map((item) => {
        if (
          item.productId === action.payload.productId &&
          item.size === action.payload.size &&
          item.color === action.payload.color
        ) {
          return { ...item, quantify: item.quantify - 1 };
        }
        return item;
      });
      localStorage.setItem("cart", JSON.stringify(newCart));
      return { ...state, carts: newCart };
    },
    removeProduct: (state, action) => {
      const { carts } = { ...state };
      const newCart =
      carts &&
      carts.filter(
        (item) =>
        item.productId !== action.payload.productId &&
        item.size !== action.payload.size &&
        item.color !== action.payload.color
        );
        console.log(carts);
      localStorage.setItem("cart", JSON.stringify(newCart));
      return { ...state, carts: newCart };
    },
  },
});

export const { addToCart, increaseCart, decreaseCart, removeProduct } =
  cartReducer.actions;
export default cartReducer.reducer;
