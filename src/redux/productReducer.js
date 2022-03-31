import { createSlice } from "@reduxjs/toolkit";

const initialState = { products: undefined };

const productReducer = createSlice({
  name: "product",
  initialState,
  reducers: {
    setProduct: (state, action) => {
      return { ...state, products: action.payload };
    },
  },
});

export const { setProduct} = productReducer.actions;
export default productReducer.reducer;
