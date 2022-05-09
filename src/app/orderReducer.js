import { createSlice } from "@reduxjs/toolkit";

export const orderSlice = createSlice({
    name: "orders",
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
    }
});
export const { setTotal, setLoading } = orderSlice.actions;
export default orderSlice.reducer;