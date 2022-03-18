
import { configureStore } from '@reduxjs/toolkit'
import cartReducer from './cartReducer';
import typeReducer from './typeReducer';
import userReducer from './userReducer';

const store = configureStore({
    reducer:{
        user:userReducer,
        type:typeReducer,
        cart:cartReducer
    }
});
export default store;