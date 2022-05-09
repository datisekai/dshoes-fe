import { createSlice } from "@reduxjs/toolkit";

export const productSlice = createSlice({
    name: "products",
    initialState: {
        loading: false,
        total: 0,
        data: [],
    },
    reducers: {
        setTotal(state, action){
            state.total = action.payload;
        },
        setLoading(state, action){
            state.loading = action.payload;
        }
    },
});
export const { setTotal, setLoading } = productSlice.actions;
export default productSlice.reducer;