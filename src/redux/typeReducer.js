import { createSlice } from "@reduxjs/toolkit";

const initialState = { type: [] };

const typeReducer = createSlice({
  name: "type",
  initialState,
  reducers: {
    setType: (state, action) => {
      return { ...state, type: action.payload };
    },
  },
});

export const {setType} = typeReducer.actions;
export default typeReducer.reducer