import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";


const initialState = {
    customer: [],
    deleteCustomer : [],
    updateCustomer : [],
    detailCustomer : [],
    loading : false,
    showModal : false,
}

export const fetchDataCustomers = createAsyncThunk('customers/fetchDataCustomers', async () => {
    return fetch(`https://6215eeb77428a1d2a354c664.mockapi.io/api/v1/customers`).then((res) => res.json())  
})


export const fetchDeleteCustomers = createAsyncThunk('customers/fetchDeleteCustomers', async (id) => {

    return fetch(`https://6215eeb77428a1d2a354c664.mockapi.io/api/v1/customers/${id}`,{
        method : "DELETE",
    }).then((res) => res.json())  
})

export const fetchAddCustomers = createAsyncThunk('customers/fetchAddCustomers', async ({data}) => {
    return fetch(`https://6215eeb77428a1d2a354c664.mockapi.io/api/v1/customers`, {
        method : "POST",
        headers : {
            Accept : "application/json",
            "Content-type" : "application/json",
        },
        body : JSON.stringify({
            companyName : data.companyName,
            taxNumber : data.taxNumber,
            taxOffice : data.taxOffice,
            invoiceCount : data.invoiceCount,
            contactNumber : data.contactNumber
        }),
    }).then((res) => res.json())   
})

export const fetchUpdateCustomers = createAsyncThunk('customers/fetchUpdateCustomers', async ({data}) => {
    return fetch(`https://6215eeb77428a1d2a354c664.mockapi.io/api/v1/customers/${data.id}`, {
        method : "PUT",
        headers : {
            Accept : "application/json",
            "Content-type" : "application/json",
        },
        body : JSON.stringify({
            companyName : data.companyName,
            taxNumber : data.taxNumber,
            taxOffice : data.taxOffice,
            invoiceCount : data.invoiceCount,
            contactNumber : data.contactNumber
        }),
    }).then((res) => res.json())   
})

export const fetchGetCustomerId = createAsyncThunk('customers/fetchGetCustomerId', async (id) => {
    return fetch(`https://6215eeb77428a1d2a354c664.mockapi.io/api/v1/customers/${id}`).then((res) => res.json())  
})


export const customers = createSlice({
    name: 'customers',
    initialState,
    reducers : {
        searchItem : (state,action) => {            
            state.searchData = action.payload
            state.customer = state.customer.filter(item => item.companyName === state.searchData || item.taxNumber === state.searchData )
           
        },
        sortByItemAZ : (state, action) => {
            state.customer = state.customer.sort((a, b) =>  a.companyName.localeCompare(b.companyName))           
        },
        sortByItemZA : (state, action) => {
            state.customer = state.customer.sort((a, b) =>  b.companyName.localeCompare(a.companyName))           
        }
    },
    extraReducers(builder){
        builder
        .addCase(fetchDataCustomers.pending, (state,action) => {
            console.log('pending')
            state.loading = true
        })
        .addCase(fetchDataCustomers.fulfilled, (state,action) => {
            state.customer = action.payload
            state.loading = false
           
        })
        .addCase(fetchDataCustomers.rejected, (state) => {
            state.loading = false
        })
        .addCase(fetchDeleteCustomers.pending, (state,action) => {
            console.log('pending')
            state.loading = true
        })
        .addCase(fetchDeleteCustomers.fulfilled, (state,action) => {
            state.deleteCustomer = action.payload
            state.loading = false
            state.customer =  state.customer.filter(item => item.id !== state.deleteCustomer.id) 
        })
        .addCase(fetchDeleteCustomers.rejected, (state) => {
            state.loading = false
        })
        .addCase(fetchAddCustomers.pending, (state,action) => {
            console.log('pending')
            state.loading = true
        })
        .addCase(fetchAddCustomers.fulfilled, (state,action) => {
             state.customer = [...state.customer ,action.payload]
           
        })
        .addCase(fetchAddCustomers.rejected, (state) => {
            state.loading = false
        })
        .addCase(fetchUpdateCustomers.pending, (state,action) => {
            console.log('pending')
            state.loading = true
        })
        .addCase(fetchUpdateCustomers.fulfilled, (state,action) => {
            state.updateCustomer = action.payload
            state.loading = false
            state.customer =  state.customer.filter(item => item.id !== action.payload.id) 
            state.customer = [...state.customer, state.updateCustomer]
          
        })
        .addCase(fetchUpdateCustomers.rejected, (state) => {
            state.loading = false
        })
        .addCase(fetchGetCustomerId.pending, (state,action) => {
            console.log('pending')
            state.loading = true
        })
        .addCase(fetchGetCustomerId.fulfilled, (state,action) => {
            state.detailCustomer = action.payload          
        })
        .addCase(fetchGetCustomerId.rejected, (state) => {
            state.loading = false
        })
    }
})


export const {searchItem, sortByItemAZ, sortByItemZA} = customers.actions
export default customers.reducer