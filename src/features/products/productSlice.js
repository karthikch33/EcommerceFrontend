import { createAction, createAsyncThunk } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import {  toast } from 'react-toastify';
import productServices from "./productService";


const initialState = {
    isError:false,
    isSuccess:false,
    isLoading:false,
    productList:"",
    singleProduct:"",
    isWishlistLoading:false,
    message:""
}

export const resetState = createAction("Reset_all")

export const getProducts = createAsyncThunk("product/getAllProducts",async(data,thunkAPI)=>{
    try {
        return await productServices.getAllProductService(data)
    } catch (error) {   
        return thunkAPI.rejectWithValue(error)
    }
})

export const getSingleProduct = createAsyncThunk("product/getproduct",async(productId,thunkAPI)=>{
    try {
        return await productServices.getProduct(productId)
    } catch (error) {
        return thunkAPI.rejectWithValue(error)
    }
})




export const addToWishlist = createAsyncThunk('product/addToWishlist',async(productID,thunkAPI)=>{
    try {
        return await productServices.addToWishlistService(productID)
    } catch (error) {
        return thunkAPI.rejectWithValue(error)
    }
})

const productSlice = createSlice({
    name:"product",
    initialState:initialState,
    reducers:{},
    extraReducers:(buidler)=>{
        buidler.addCase(getProducts.pending,(state)=>{
            state.isError = false
            state.isLoading = true
            state.isSuccess = false
        })
        .addCase(getProducts.fulfilled,(state,action)=>{
            state.isError = false
            state.isSuccess = true
            state.isLoading = false
            state.productList = action.payload
             if(action.payload?.status === 403)
                toast.error('Session Time Out Login Again')
        })
        .addCase(getProducts.rejected,(state,action)=>{
            state.isError = true
            state.isLoading = false
            state.isSuccess = false
            state.message = action.error
        })
        .addCase(resetState,()=>initialState)
        buidler.addCase(addToWishlist.pending,(state)=>{
            state.isError = false
            state.isWishlistLoading = true
            state.isSuccess = false
        })
        .addCase(addToWishlist.fulfilled,(state,action)=>{
            state.isError = false
            state.isSuccess = true
            state.isWishlistLoading = false
             if(action.payload?.status === 403)
                toast.error('Session Time Out Login Again')
        })
        .addCase(addToWishlist.rejected,(state,action)=>{
            state.isError = true
            state.isLoading = false
            state.isSuccess = false
            state.message = action.error
        })
        buidler.addCase(getSingleProduct.pending,(state)=>{
            state.isError = false
            state.isLoading = true
            state.isSuccess = false
        })
        .addCase(getSingleProduct.fulfilled,(state,action)=>{
            state.isError = false
            state.isSuccess = true
            state.isLoading = false
            state.singleProduct = action.payload
            console.log(action.payload);
             if(action.payload?.status === 403)
                toast.error('Session Time Out Login Again')
        })
        .addCase(getSingleProduct.rejected,(state,action)=>{
            state.isError = true
            state.isLoading = false
            state.isSuccess = false
            state.message = action.error
        })
    }
})

export default productSlice.reducer