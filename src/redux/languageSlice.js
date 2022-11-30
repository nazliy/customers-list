import { createSlice } from "@reduxjs/toolkit";
import data from '../language.json'


const initialState = {
    language: data[0],
}

export const language = createSlice({
    name : 'language',
    initialState,
    reducers :{
        languageChange : (state, action) => {
            state.language = data[action.payload]
        }
    }
})

export const {languageChange} = language.actions

export default language.reducer