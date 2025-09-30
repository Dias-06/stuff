import { configureStore } from '@reduxjs/toolkit'
import categoriesSlice from './categories'
import productsSlice from './products'
import userSlice from './user'
export const store = configureStore({
  reducer: {
    categories: categoriesSlice,
    products: productsSlice,
    user: userSlice,
  },
})