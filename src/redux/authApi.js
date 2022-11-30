import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";


const initialState = {
    users: [],
    user : [],
    loading : false,
    login : true,
    warning : false
}


export const fetchDataUsers = createAsyncThunk('customers/fetchDataUsers', async () => {
    return fetch(`https://6215eeb77428a1d2a354c664.mockapi.io/api/v1/users`).then((res) => res.json())  
})



export const users = createSlice({
    name: 'users',
    initialState,
    reducers : {
        loginUser : (state,action) =>{           
            state.user = action.payload
         
            state.users.filter( item => {
                if(item.username === action.payload.name && item.password === action.payload.psw){
                    state.login = false
                }
                else{
                    state.warning = true
                }
            })      
        }
    },
    extraReducers(builder){
        builder
        .addCase(fetchDataUsers.pending, (state,action) => {
            console.log('pending')
            state.loading = true
        })
        .addCase(fetchDataUsers.fulfilled, (state,action) => {
            state.users = action.payload
            state.loading = false
           
        })
        .addCase(fetchDataUsers.rejected, (state) => {
            state.loading = false
        })
    }
})

 export const {loginUser} = users.actions

export default users.reducer