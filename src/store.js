import { configureStore } from "@reduxjs/toolkit";
import users from './redux/authApi'
import customers from './redux/customerSlice'
import language from './redux/languageSlice'

export const store = configureStore({
    reducer :{
        users,
        customers,
        language
    }
})