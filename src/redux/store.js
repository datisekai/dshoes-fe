
import { configureStore } from '@reduxjs/toolkit'
import typeReducer from './typeReducer';
import userReducer from './userReducer';

const store = configureStore({
    reducer:{
        user:userReducer,
        type:typeReducer
    }
});
export default store;