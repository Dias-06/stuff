import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// export const getProducts = createAsyncThunk('products/getProducts', async () => {
//     try {
//         const response = await fetch('https://api.escuelajs.co/api/v1/products');
//         const data = await response.json()
//         return data;
//     } catch (error) {
//         console.log(error)
//     }
// })

// export const filterByTitle = createAsyncThunk('products/filterByTitle', async (title) => {
//     try {
//         const response = await fetch(`https://api.escuelajs.co/api/v1/products/?title=${title}`);
//         const data = await response.json()
//         return data;
//     } catch (error) {
//         console.log(error);
//     }
// })

// export const filterByPriceRange = createAsyncThunk('products/filterByPriceRange', async (max,min) => {
//     try{
//         const response = await fetch(`https://api.escuelajs.co/api/v1/products/?price_min=${min}&price_max=${max}`);
//         const data = await response.json();
//         return data;
//     } catch (error) {
//         console.log(error);
//     }
// })
// const productsSlice = createSlice({
//     name: 'products',
//     initialState: {
//         products: [],
//         filtered: [],
//         related: [],
//         isLoading: false
//     },
//     reducers: {
//         filterByPrice: (state, {payload}) => {
//             state.filtered = state.products.filter(item => item.price < payload)
//         },
//         relatedProducts: (state, {payload}) => {
//             state.related = state.products.filter(item => item.category.id == payload)
//         },
//         filterByCategory: (state, {payload}) => {
//             state.filtered= state.products.filter(item => Number(item.category.id) == payload)
//         },
//         filterByPrice: (state, {payload}) => {
//             state.filtered= state.products.filter(item => Number(item.category.id) == payload)
//         },
//     },
//     extraReducers: (builderer) =>{
//         builderer.addCase(getProducts.pending, (s) => {
//             s.isLoading = true
//         });
//         builderer.addCase(getProducts.fulfilled, (s,action) => {
//             s.isLoading = false
//             s.products = action.payload
//         });
//         builderer.addCase(getProducts.rejected, (s) => {
//             s.isLoading = false
//             console.log('error')
//         });
//         builderer.addCase(filterByTitle.pending, (s) => {
//             s.isLoading = true
//         });
//         builderer.addCase(filterByTitle.fulfilled, (state, action) => {
//             state.filtered = action.payload;
//             state.isLoading = false;
//         });
//         builderer.addCase(filterByPriceRange.fulfilled, (state, action) => {
//             state.filtered = action.payload;
//         });
//     }
// }
// )
// export const {filterByPrice, relatedProducts, filterByCategory} = productsSlice.actions
// export default productsSlice.reducer
export const getProducts = createAsyncThunk('products/getProducts', async () => {
  try {
    const response = await fetch('https://api.escuelajs.co/api/v1/products');
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
});

export const filterByTitle = createAsyncThunk('products/filterByTitle', async (title) => {
  try {
    const response = await fetch(`https://api.escuelajs.co/api/v1/products/?title=${title}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
});

export const filterByPriceRange = createAsyncThunk('products/filterByPriceRange', async ({ min, max }) => {
  try {
    const response = await fetch(`https://api.escuelajs.co/api/v1/products/?price_min=${min}&price_max=${max}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
});

const productsSlice = createSlice({
  name: 'products',
  initialState: {
    products: [],
    filtered: [],
    related: [],
    isLoading: false
  },
  reducers: {
    filterByPrice: (state, { payload }) => {
      state.filtered = state.products.filter(item => item.price < payload);
    },
    relatedProducts: (state, { payload }) => {
      state.related = state.products.filter(item => item.category.id === payload);
    },
    filterByCategory: (state, { payload }) => {
      state.filtered = state.products.filter(item => Number(item.category.id) === payload);
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getProducts.pending, (s) => {
        s.isLoading = true;
      })
      .addCase(getProducts.fulfilled, (s, action) => {
        s.isLoading = false;
        s.products = Array.isArray(action.payload) ? action.payload : [];
      })
      .addCase(getProducts.rejected, (s) => {
        s.isLoading = false;
        console.log('error');
      })
      .addCase(filterByTitle.fulfilled, (state, action) => {
        state.filtered = Array.isArray(action.payload) ? action.payload : [];
        state.isLoading = false;
      })
      .addCase(filterByPriceRange.fulfilled, (state, action) => {
        state.filtered = Array.isArray(action.payload) ? action.payload : [];
      });
  }
});

export const { filterByPrice, relatedProducts, filterByCategory } = productsSlice.actions;
export default productsSlice.reducer;
