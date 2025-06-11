import {createSlice} from '@reduxjs/toolkit';

const initialValue = {
    allCategory: [],
    subCategory: [],
    product : [],
}

const productSlice = createSlice({
    name: 'product',
    initialState: initialValue,
    reducers: {
        setAllCategory: (state, action) => {
            console.log("All category data: ", action.payload)
            state.allCategory = [...action.payload];
        },
        setSubCategory: (state, action) => {
            state.subCategory = action.payload;
        },
        setProduct: (state, action) => {
            state.product = action.payload;
        },
    },
})


export const {setAllCategory, setSubCategory, setProduct} = productSlice.actions;

export default productSlice.reducer;