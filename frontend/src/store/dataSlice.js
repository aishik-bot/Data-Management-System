import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
    loading: false,
    data: {},
    error: ''
}

export const fetchData = createAsyncThunk('data/fetchData',()=>{
    return axios.get('http://localhost:8000/api/v1/data')
    .then(response=>{
        return response.data
    })
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