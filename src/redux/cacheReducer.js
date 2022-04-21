import { createSlice } from "@reduxjs/toolkit";

const initialState = { cache:{}};

const cacheReducer = createSlice({
  name: "cache",
  initialState,
  reducers: {
      saveCache:(state, action) => {
          state.cache = {...state.cache,[action.payload.url]:action.payload.cache};
      }
   
  },
});

export const { saveCache } = cacheReducer.actions;
export default cacheReducer.reducer;
