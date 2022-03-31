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
      const isFound = carts?.some((item) => item._id === action.payload._id);
      if (isFound) {
        const newCarts = carts?.map((item) => {
          if (item._id === action.payload._id) {
            return { ...item, quantify: item.quantify + 1 };
          }
          return item;
        });
        localStorage.setItem("cart", JSON.stringify(newCarts));
        return { ...state, carts: newCarts };
      }
      localStorage.setItem("cart", JSON.stringify([...carts, action.payload]));
      return { ...state, carts: [...state.carts, action.payload] };
    },
    increaseCart: (state, action) => {
      const { carts } = { ...state };

      const newCart = carts.map((item) => {
        if (item._id === action.payload._id) {
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
        if (item._id === action.payload._id) {
          return { ...item, quantify: item.quantify - 1 };
        }
        return item;
      });
      localStorage.setItem("cart", JSON.stringify(newCart));
      return { ...state, carts: newCart };
    },
    removeProduct: (state, action) => {
      const { carts } = { ...state };
      const newCart = carts?.filter((item) => item._id !== action.payload._id);
      localStorage.setItem("cart", JSON.stringify(newCart));
      return { ...state, carts: newCart };
    },
    removeCart:(state, action) => {
      localStorage.setItem("cart", JSON.stringify([]));
      return {...state, carts:[]}
    }
  },
});

export const { addToCart, increaseCart, decreaseCart, removeProduct,removeCart } =
  cartReducer.actions;
export default cartReducer.reducer;
