import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const getCategories = createAsyncThunk('categories/getCategoires', async (_, ThunkApi) => {
    try {
        const response = await fetch('https://api.escuelajs.co/api/v1/categories');
        const data = await response.json()
        return data
    } catch (error) {
        console.log(error)
        return ThunkApi.rejectWithValue(error)
    }
})
const categoriesSlice = createSlice({
    name: 'categories',
    initialState: {
        list: [],
        isLoading: false
    },
    extraReducers: (builder) => {
        builder.addCase(getCategories.pending, (state) => {
            state.isLoading = true
        });
        builder.addCase(getCategories.fulfilled, (state, action) => {
            state.list = action.payload;
            state.isLoading = false;
        });
        builder.addCase(getCategories.rejected, (state) => {
            state.isLoading = false;
            console.log('error')
        });
    }

})
export default categoriesSlice.reducer