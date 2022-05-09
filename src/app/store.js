import productReducer from "./productReducer";
import accountReducer from "./accountReducer";
import orderReducer from "./orderReducer";
import userReducer from "./userReducer";
import typeReducer from "./typeReducer";
import { configureStore } from "@reduxjs/toolkit";

export const store = configureStore({
    reducer: {
        products: productReducer,
        accounts: accountReducer,
        orders: orderReducer,
        types: typeReducer,
        user: userReducer,
    }
});