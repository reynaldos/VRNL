import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    currentVideo: {},
    loading: false,
    error: false
}

export const videoSlice = createSlice({
    name: 'video',
    initialState,
    reducers:{
       fetchStart: (state)=>{
        state.loading = true;
       },
       fetchSuccess: (state, action)=>{
        state.loading = false;
        state.currentVideo = action.payload;

       } ,
       fetchFailure: (state)=>{
        state.loading = false;
        state.error = true;
       },
        logout: (state)=>{
            return initialState
       },
    }
});

export const { fetchStart, fetchSuccess, fetchFailure } = videoSlice.actions;

export default videoSlice.reducer;