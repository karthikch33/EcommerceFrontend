import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import BlogServices from "./blogService";
import { toast } from "react-toastify";


const initialState = {
    isError:false,
    isLoading:false,
    isSuccess:false,
    FetchedBlogs:"",
    FetchedBlog:"",
    message:"",
}

export const getAllBlogs = createAsyncThunk('blogs/getallblogs',async(thunkAPI)=>{
    try {
        return await BlogServices.getAllBlogsService()
    } catch (error) {
        return thunkAPI.rejectWithValue(error)
    }
})

export const getABlog = createAsyncThunk('blogs/getABlog',async(blogId,thunkAPI)=>{
    try {
        return await BlogServices.getABlog(blogId)
    } catch (error) {
        return thunkAPI.rejectWithValue(error)
    }
})

const blogSlice = createSlice({
    name:"blogs",
    initialState:initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder.addCase(getAllBlogs.pending,(state)=>{
            state.isError = false
            state.isLoading = true
            state.isSuccess = false
        })
        .addCase(getAllBlogs.fulfilled,(state,action)=>{
            state.isError = false
            state.isLoading = false
            state.isSuccess = true
            state.FetchedBlogs = action.payload
             if(action.payload?.status === 403)
                toast.error('Session Time Out Login Again')
        })
        .addCase(getAllBlogs.rejected,(state,action)=>{
            state.isError = true
            state.isLoading = false
            state.isSuccess = false
            state.message = action.error
        })
        builder.addCase(getABlog.pending,(state)=>{
            state.isError = false
            state.isLoading = true
            state.isSuccess = false
        })
        .addCase(getABlog.fulfilled,(state,action)=>{
            state.isError = false
            state.isLoading = false
            state.isSuccess = true
            state.FetchedBlog = action.payload
             if(action.payload?.status === 403)
                toast.error('Session Time Out Login Again')
        })
        .addCase(getABlog.rejected,(state,action)=>{
            state.isError = true
            state.isLoading = false
            state.isSuccess = false
            state.message = action.error
        })
    }
})

export default blogSlice.reducer