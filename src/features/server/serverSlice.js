import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import serverServices from "./serverService";

const initialState = {
    isError:false,
    isSuccess:false,
    isLoading:false,
    serverCondition:'',
    message:""
}

export const serverOnOrOff = createAsyncThunk('server/condition',async(thunkAPI)=>{
    try {
       return await serverServices.serverOnOrOff()
    } catch (error) {
        thunkAPI.rejectWithValue(error)
    }
})

const serverSlice = createSlice({
    name:'server',
    initialState:initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder.addCase(serverOnOrOff.pending,(state)=>{
            state.isError = false
            state.isSuccess = false
            state.isLoading = true
    })
    .addCase(serverOnOrOff.fulfilled,(state,action)=>{
        state.isError = false
            state.isSuccess = true
            state.isLoading = false
            state.serverCondition = action.payload
            if(action.payload?.status === 201)
            localStorage.setItem('server', JSON.stringify({ server: 'ONIn' }));
            else if(action.payload?.status === 404)
            localStorage.removeItem('server')
    })
    .addCase(serverOnOrOff.rejected,(state,action)=>{
        state.isError = true
            state.isSuccess = false
            state.isLoading = false
            state.message = action.error
    })
    }
})

export default serverSlice.reducer