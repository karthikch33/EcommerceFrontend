import { createAction, createAsyncThunk } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import {  toast } from 'react-toastify';
import {useNavigate} from 'react-router-dom'
import userServices from "./userService";
import { Alert, Space } from "antd";

const getUserfromLocalStorage = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : ""

let initialState = {
    isError:false,
    isSuccess:false,
    isLoading:false,
    user:getUserfromLocalStorage,
    userRefreshToken:"",
    alreadyExist:"",
    compareItemsList:"",
    orderPlaced:"",
    wishlist:"",
    userCart:"",
    updatedProfile:"",
    message:""
}

export const resetState = createAction("Reset_all")

export const registerUser = createAsyncThunk("auth/register",async (userData,thunkAPI)=>{
    try {
        return await userServices.registerService(userData);
    } catch (error) {
        return thunkAPI.rejectWithValue(error)
    }
})

export const loginUser = createAsyncThunk("user/login",async(loginData,thunkAPI)=>{
    try {
        return await userServices.userLoginService(loginData)
    } catch (error) {
        return thunkAPI.rejectWithValue(error)
    }
})

export const getWishlist = createAsyncThunk("user/getwishlist",async(userId,thunkAPI)=>{
    try {
        return await userServices.getWishlistService(userId)
    } catch (error) {
        return thunkAPI.rejectWithValue(error)
    }
})

export const addCompareItem = createAsyncThunk("user/addCompareItem",async(prodId,thunkAPI)=>{
    try {
        return await userServices.addcompareItemService(prodId)
    } catch (error) {
        return  thunkAPI.rejectWithValue(error)
    }
})

export const addToCart = createAsyncThunk('user/createCart',async(cartAdditionData,thunkAPI)=>{
    try {
        return await userServices.addToCartService(cartAdditionData)
    } catch (error) {
        return thunkAPI.rejectWithValue(error)
    }
})

export const getCart = createAsyncThunk('user/getCart',async(userId,thunkAPI)=>{
    try {
        return await userServices.getCartService(userId)
    } catch (error) {
        return thunkAPI.rejectWithValue(error)
    }
})


export const getCompareItems = createAsyncThunk("user/getcompareitems",async(userId,thunkAPI)=>{
    try {
        return await userServices.getCompareItemsService(userId)        
    } catch (error) {
        thunkAPI.rejectWithValue(error)
    }
})

export const emptyCartUsingProductId = createAsyncThunk("user/emptycartusingproductId",async(productId,thunkAPI)=>{
    try {
        return await userServices.emptyCartService(productId)
    } catch (error) {
        return thunkAPI.rejectWithValue(error)
    }
})

export const emptyEntireCart = createAsyncThunk('user/emptyentirecart',async(thunkAPI)=>{
    try {
        console.log("coming here");
        return await userServices.emptyEntireCartService()
    } catch (error) {
        return thunkAPI.rejectWithValue(error)
    }
})

export const createAnOrder = createAsyncThunk('user/cart/order',async(orderData,thunkAPI)=>{
    try {
        return await userServices.createOrder(orderData)
    } catch (error) {
        return thunkAPI.rejectWithValue(error)
    }
})

export const getUser = createAsyncThunk('user/getUser',async(thunkAPI)=>{
    try {
        return await userServices.getUserService()
    } catch (error) {
        return thunkAPI.rejectWithValue(error)
    }
})

export const updateUser = createAsyncThunk('user/updateUser',async(updatedData,thunkAPI)=>{
    try {
        return await userServices.updateUserService(updatedData)
    } catch (error) {
        return thunkAPI.rejectWithValue(error)
    }
})

export const forgotpasswordToken = createAsyncThunk('user/forgotpasswordtoken',async(emailSearch,thunkAPI)=>{
    try {
        return await userServices.forgotPasswordTokenService(emailSearch)
    } catch (error) {
        thunkAPI.rejectWithValue(error)
    }
})

export const resetPassword = createAsyncThunk('user/resetpassword',async(TokenAndPassword,thunkAPI)=>{
    try {
        return await userServices.resetPasswordService(TokenAndPassword)
    } catch (error) {
        thunkAPI.rejectWithValue(error)
    }
})


export const authSlice = createSlice({
    name:"auth",
    initialState,
    reducers:{
        reset: (state) => {
            state.alreadyExist = ''; // This will work with immer
          },
    },
    extraReducers:(buidler)=>{
        buidler.addCase(registerUser.pending,(state,action)=>{
            state.isError = true
            state.isLoading = true
            state.isSuccess = false
        })
        .addCase(registerUser.fulfilled,(state,action)=>{
            state.isError = false
            state.isSuccess = true
            state.isLoading = false
            if(state.isSuccess === true)
            toast.info("User Created Successfully")
        })
        .addCase(registerUser.rejected,(state,action)=>{
            state.isError = true
            state.isLoading = false
            state.isSuccess = false
            state.message = action.error
            if(state.isError === true)
            toast.info("User Not Created")
        })
        .addCase(resetState,()=>initialState)
        buidler.addCase(loginUser.pending,(state,action)=>{
            state.isError = true
            state.isLoading = true
            state.isSuccess = false
        })
        .addCase(loginUser.fulfilled,(state,action)=>{
            state.isError = false
            state.isSuccess = true
            state.isLoading = false
            state.user = action.payload
            if(state.isSuccess === true)
            {
                state.userRefreshToken = action.payload?.token
                localStorage.setItem("user",JSON.stringify(action.payload))
                toast.info("User Logged In Successfully")
                setTimeout(()=>{
                    window.location.reload()
                },2000)
            }
        })
        .addCase(loginUser.rejected,(state,action)=>{
            state.isError = true
            state.isLoading = false
            state.isSuccess = false
            state.message = action.error
        })
        buidler.addCase(getWishlist.pending,(state,action)=>{
            state.isError = true
            state.isLoading = true
            state.isSuccess = false
        })
        .addCase(getWishlist.fulfilled,(state,action)=>{
            state.isError = false
            state.isSuccess = true
            state.isLoading = false
            state.wishlist = action.payload
        })
        .addCase(getWishlist.rejected,(state,action)=>{
            state.isError = true
            state.isLoading = false
            state.isSuccess = false
            state.message = action.error
        })
        buidler.addCase(getCompareItems.pending,(state,action)=>{
            state.isError = true
            state.isLoading = true
            state.isSuccess = false
        })
        .addCase(getCompareItems.fulfilled,(state,action)=>{
            state.isError = false
            state.isSuccess = true
            state.isLoading = false
            state.compareItemsList = action.payload?.compareItems
        })
        .addCase(getCompareItems.rejected,(state,action)=>{
            state.isError = true
            state.isLoading = false
            state.isSuccess = false
            state.message = action.error
        })
        buidler.addCase(addCompareItem.pending,(state,action)=>{
            state.isError = true
            state.isLoading = true
            state.isSuccess = false
            state.alreadyExist = "Loading"
        })
        .addCase(addCompareItem.fulfilled,(state,action)=>{
            state.isError = false
            state.isSuccess = true
            state.isLoading = false
            state.alreadyExist = action.payload?.alreadyExist
        })
        .addCase(addCompareItem.rejected,(state,action)=>{
            state.isError = true
            state.isLoading = false
            state.isSuccess = false
            state.message = action.error
        })
        buidler.addCase(addToCart.pending,(state,action)=>{
            state.isError = true
            state.isLoading = true
            state.isSuccess = false
        })
        .addCase(addToCart.fulfilled,(state,action)=>{
            state.isError = false
            state.isSuccess = true
            state.isLoading = false
            if(action.payload?.message === "Product Incremented to cart successfully")
            {
               toast.info("Product Incremented to cart successfully")
            }
            else if(action.payload?.message === "Product added to cart successfully")
            {
                toast.success('Product added to cart successfully')
            }
            else if(action.payload?.message === 'Product Decremented to cart successfully')
            {
                toast.info('Product Decremented to cart successfully')
            }
        })
        .addCase(addToCart.rejected,(state,action)=>{
            state.isError = true
            state.isLoading = false
            state.isSuccess = false
            state.message = action.error
        })
        buidler.addCase(getCart.pending,(state,action)=>{
            state.isError = true
            state.isLoading = true
            state.isSuccess = false
        })
        .addCase(getCart.fulfilled,(state,action)=>{
            state.isError = false
            state.isSuccess = true
            state.isLoading = false
            state.userCart = action.payload
        })
        .addCase(getCart.rejected,(state,action)=>{
            state.isError = true
            state.isLoading = false
            state.isSuccess = false
            state.message = action.error
        })
        buidler.addCase(emptyCartUsingProductId.pending,(state,action)=>{
            state.isError = true
            state.isLoading = true
            state.isSuccess = false
        })
        .addCase(emptyCartUsingProductId.fulfilled,(state,action)=>{
            state.isError = false
            state.isSuccess = true
            state.isLoading = false
        })
        .addCase(emptyCartUsingProductId.rejected,(state,action)=>{
            state.isError = true
            state.isLoading = false
            state.isSuccess = false
            state.message = action.error
        })
        buidler.addCase(createAnOrder.pending,(state,action)=>{
            state.isError = true
            state.isLoading = true
            state.isSuccess = false
        })
        .addCase(createAnOrder.fulfilled,(state,action)=>{
            state.isError = false
            state.isSuccess = true
            state.isLoading = false
            state.orderedProduct = action.payload
            if(state.isSuccess)
            {
                toast.success("Ordered Placed Navigating To Home")
                state.orderPlaced = "Success"
            }
            else
            {
                toast.error("Something Went Wrong")
            }
        })
        .addCase(createAnOrder.rejected,(state,action)=>{
            state.isError = true
            state.isLoading = false
            state.isSuccess = false
            state.message = action.error
        })
        buidler.addCase(emptyEntireCart.pending,(state)=>{
            state.isLoading = true
            state.isError = false
            state.isSuccess = false
        })
        .addCase(emptyEntireCart.fulfilled,(state,action)=>{
            state.isError = false
            state.isSuccess = true
            state.isLoading = false
        })
        .addCase(emptyEntireCart.rejected,(state,action)=>{
            state.isError = true
            state.isSuccess = false
            state.isLoading = false
            state.updatedProfile = action.error
            state.message = action.error
        })
        buidler.addCase(updateUser.pending,(state)=>{
            state.isLoading = true
            state.isError = false
            state.isSuccess = false
        })
        .addCase(updateUser.fulfilled,(state,action)=>{
            state.isError = false
            state.isSuccess = true
            state.isLoading = false
            state.updatedProfile = action.payload
            if(state.updatedProfile?.status === 201)
            {
                toast.success('Updated Successfully')
            }
            else{
                if(state.updatedProfile?.status && state.updatedProfile?.error?.codeName === 'DuplicateKey')
                if(state.updatedProfile?.error?.keyPattern?.mobile)
                toast.error('Mobile Already Exists')
            }
        })
        .addCase(updateUser.rejected,(state,action)=>{
            state.isError = true
            state.isSuccess = false
            state.isLoading = false
            state.message = action.error
        })
        buidler.addCase(getUser.pending,(state,action)=>{
            state.isError = true
            state.isLoading = true
            state.isSuccess = false
        })
        .addCase(getUser.fulfilled,(state,action)=>{
            state.isError = false
            state.isSuccess = true
            state.isLoading = false
            state.user = action.payload
            if(state.isSuccess)
            {
                localStorage.setItem('user',JSON.stringify(action.payload))
            }

        })
        .addCase(getUser.rejected,(state,action)=>{
            state.isError = true
            state.isLoading = false
            state.isSuccess = false
            state.message = action.error
        })
        buidler.addCase(forgotpasswordToken.pending,(state)=>{
            state.isLoading = true
            state.isError = false
            state.isSuccess = false
        })
        .addCase(forgotpasswordToken.fulfilled,(state,action)=>{
            state.isError = false
            state.isSuccess = true
            state.isLoading = false
            if(state.isSuccess === true)
            {
                toast.success("Email Sent To Provided Mail")
            }
        })
        .addCase(forgotpasswordToken.rejected,(state,action)=>{
            state.isError = true
            state.isSuccess = false
            state.isLoading = false
            state.message = action.error
        })
        buidler.addCase(resetPassword.pending,(state)=>{
            state.isLoading = true
            state.isError = false
            state.isSuccess = false
        })
        .addCase(resetPassword.fulfilled,(state,action)=>{
            state.isError = false
            state.isSuccess = true
            state.isLoading = false
            if(action.payload === undefined)
            {
                toast.error('Token Expired, Please Generate Link Again')
            }
            if(action.payload)
            {
                toast.success('Password Updated')
            }
        })
        .addCase(resetPassword.rejected,(state,action)=>{
            state.isError = true
            state.isSuccess = false
            state.isLoading = false
            state.message = action.error
        })
    }
})

export const {  reset } = authSlice.actions;

export default authSlice.reducer