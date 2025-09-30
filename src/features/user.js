import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
export const createUser = createAsyncThunk('user/createUser', async (payload) => {
    try {
        const response = await axios.post('https://api.escuelajs.co/api/v1/users/', payload);
        return response.data;
    } catch (error) {
        console.log(error)
    }
})
export const loginUser = createAsyncThunk('user/loginUser', async (payload) => {
    try {
        const response = await axios.post('https://api.escuelajs.co/api/v1/auth/login', payload);
        const login = await axios.get('https://api.escuelajs.co/api/v1/auth/profile', {
            headers: {
                Authorization : `Bearer ${response.data.access_token}`
            }
        })
        return login.data;
    } catch (error) {
        console.log(error)
    }
})
const userSlice = createSlice({
    name: 'user',
    initialState: {
        cart : [],
        currentUser: null,
        formType: 'signUp',
        showForm: false,
        isLoading: false
    },
    reducers: {
        addToCart: (state, {payload}) => {
            let newCart = [...state.cart];
            const found = state.cart.find(item => payload.id == item.id);
            if( found ){
                newCart = newCart.map(item => {
                    return item.id == payload.id ? {...item, quntity: payload.quntity || item.quntity + 1} : item
                })
                console.log(newCart)
            }
            else{
                newCart.push({...payload, quntity: 1})
                console.log(newCart)
            }
            state.cart = newCart;
        },
        toggleForm: (state, action) => {
            state.showForm = action.payload
        },
        toggleFormType: (state, action) => {
            state.formType = action.payload
        }
    },
    extraReducers: (builder) => {
        builder.addCase(createUser.fulfilled, (state, actions) => {
            state.currentUser = actions.payload
        });
        builder.addCase(loginUser.fulfilled, (state, actions) => {
            state.currentUser = actions.payload
        })
    }
})
export default userSlice.reducer
export const {addToCart, toggleForm, toggleFormType} = userSlice.actions