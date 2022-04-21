
import { configureStore } from '@reduxjs/toolkit'
import cacheReducer from './cacheReducer';
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
        product:productReducer,
        cache:cacheReducer
    },
});
export default store;