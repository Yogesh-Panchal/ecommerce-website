//import {configureStore} from "@reduxjs/toolkit" ;
import { configureStore } from "@reduxjs/toolkit";

//import authReducer from "./auth-slice";
//import authReducer from "./auth-slice"; // will resolve to ./auth-slice/index.js
import authReducer from './auth-slice';




const store = configureStore({
    reducer :{
        auth:authReducer,
    },
})

export default store;