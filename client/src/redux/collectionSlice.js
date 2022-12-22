import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    currentCollection: {videos:[]},
    loading: false,
    error: false
}

export const colllectionSlice = createSlice({
    name: 'collection',
    initialState,
    reducers:{
       fetchStart: (state)=>{
        state.loading = true;
       },
       fetchSuccess: (state, action)=>{
        state.loading = false;
        state.currentCollection = action.payload;

       } ,
       fetchFailure: (state)=>{
        state.loading = false;
        state.error = true;
       },
    }
});

export const { fetchStart, fetchSuccess, fetchFailure } = colllectionSlice.actions;

export default colllectionSlice.reducer;