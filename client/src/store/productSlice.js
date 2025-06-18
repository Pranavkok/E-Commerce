import {createSlice} from '@reduxjs/toolkit';

const initialValue = {
    allCategory: [],
    loadingCategory : false,
    allSubCategory: [],
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
        setloadingCategory: (state, action) => {
            state.loadingCategory = action.payload;
        },
        setAllSubCategory: (state, action) => {
            state.allSubCategory = [...action.payload];
        },
        setProduct: (state, action) => {
            state.product = action.payload;
        },
    },
})


export const {setAllCategory,setloadingCategory, setAllSubCategory, setProduct} = productSlice.actions;

export default productSlice.reducer;