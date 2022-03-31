import { createSlice } from "@reduxjs/toolkit";

const initialState = { text: undefined, flag: false };

const searchReducer = createSlice({
  name: "search",
  initialState,
  reducers: {
    setText: (state, action) => {
      return { ...state, text: action.payload };
    },
    setFlag: (state, action) => {
      return { ...state, flag: action.payload };
    },
  },
});

export const { setText, setFlag } = searchReducer.actions;
export default searchReducer.reducer;
