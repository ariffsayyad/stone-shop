import { createSlice } from '@reduxjs/toolkit'

const productSlice = createSlice({
    name: 'product',
    initialState: {
        list: [],
    },
    reducers: {
        setProduct: (state, action) => {
            state.list = action.payload
        },
        addProduct: (state, action) => {
            state.list.unshift(action.payload) // Add to beginning for latest products
        },
        updateProduct: (state, action) => {
            const index = state.list.findIndex(p => p.id === action.payload.id)
            if (index !== -1) {
                state.list[index] = action.payload
            }
        },
        deleteProduct: (state, action) => {
            state.list = state.list.filter(p => p.id !== action.payload)
        },
        clearProduct: (state) => {
            state.list = []
        }
    }
})

export const { setProduct, addProduct, updateProduct, deleteProduct, clearProduct } = productSlice.actions

export default productSlice.reducer
