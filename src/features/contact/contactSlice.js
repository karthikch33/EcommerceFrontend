import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import contactServices from "./contactService";
import { toast } from "react-toastify";


const initialState = {
    isError:false,
    isLoading:false,
    isSuccess:false,
    message:""
}

export const createEnquiry = createAsyncThunk('contact/createEnquiry',async(contactData,thunkAPI)=>{
    try {
        return await contactServices.createEnquiryService(contactData)
    } catch (error) {
        return thunkAPI.rejectWithValue(error)
    }
})

const contactSlice = createSlice({
    name:"contact",
    initialState:initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder.addCase(createEnquiry.pending,(state)=>{
            state.isError = false
            state.isLoading = true
            state.isSuccess = false
        })
        .addCase(createEnquiry.fulfilled,(state,action)=>{
            state.isError = false
            state.isLoading = false
            state.isSuccess = true
            if(state.isSuccess === true)
            {
                toast.success('Enquiry Created')
            }
            else if(state.isError === true)
            {
                toast.error('Enquiry Failed To Submit')
            }
       })
        .addCase(createEnquiry.rejected,(state,action)=>{
            state.isError = true
            state.isLoading = false
            state.isSuccess = false
            state.message = action.error
        })
    }
})

export default contactSlice.reducer