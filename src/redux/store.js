
import { configureStore } from '@reduxjs/toolkit'
import cartReducer from './cartReducer';
import productReducer from './productReducer';
import searchReducer from './searchReducer';
import typeReducer from './typeReducer';
import userReducer from './userReducer';

const store = configureStore({
    reducer:{
        user:userReducer,
        type:typeReducer,
        cart:cartReducer,
        search:searchReducer,
        product:productReducer
    }
});
export default store;