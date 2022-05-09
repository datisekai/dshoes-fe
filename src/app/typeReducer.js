import { createSlice } from "@reduxjs/toolkit";

export const typeSlice = createSlice({
    name: "types",
    initialState: [],
    reducers: {
        setTypes(state, action) {
            state = action.payload;
        },  
    },
});
export const { setTypes } = typeSlice.actions;
export default typeSlice.reducer;