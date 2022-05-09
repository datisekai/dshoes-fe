import { createSlice } from "@reduxjs/toolkit";

export const accountSlice = createSlice({
    name: "accounts",
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
export const { setTotal, setLoading } = accountSlice.actions;
export default accountSlice.reducer;