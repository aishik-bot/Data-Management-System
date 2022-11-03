import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
    loading: false,
    data: {
        success: false,
        count: 0,
        data: []
    },
    error: ''
}

export const fetchData = createAsyncThunk('data/fetchData',async ()=>{
    try {
        const response = await axios.get('http://localhost:8000/api/v1/data');
        return response.data;
    } catch (error) {
        console.log(error)
    }
})

const dataSlice = createSlice({
    name: 'data',
    initialState,
    extraReducers: builder=>{
        builder
            .addCase(fetchData.pending, state=>{
                state.loading = true
            })
            .addCase(fetchData.fulfilled, (state, action)=>{
                state.loading = false,
                state.data = action.payload,
                state.error = ''
            })
            .addCase(fetchData.rejected, (state, action)=>{
                state.loading = false,
                state.data = {},
                state.error = action.error.message
            })
    }
});

export default dataSlice.reducer;