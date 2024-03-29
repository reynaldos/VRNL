import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    currentUser: null,
    loading: false,
    error: false,
    newUpload: false
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers:{
       loginStart: (state)=>{
            state.loading = true;
       },
       loginSuccess: (state, action)=>{
            state.loading = false;
            state.currentUser = action.payload;
       } ,
       loginFailure: (state)=>{
            state.loading = false;
            state.error = true;
       },
        logout: (state)=>{
           return initialState;
       },
       favorite: (state, action)=>{
          if(!state.currentUser.favorites.includes(action.payload)){
               state.currentUser.favorites.push(action.payload);
          }
       },
       unfavorite: (state, action)=>{
          if(state.currentUser.favorites.includes(action.payload)){
               state.currentUser.favorites.splice( 
                    state.currentUser.favorites.findIndex(
                         (collectionId) => collectionId === action.payload
                    ),
               1
               );
          }
       },
       newCollection: (state, action)=>{

          if(action.payload.type === 'subscriberedFolders'){
               state.currentUser.subscriberedFolders.push(action.payload.collectionId);
          }
         
       },

        deleteCollection: (state, action)=>{
          
          if(action.payload.type === 'subscriberedFolders'){
               if( state.currentUser.subscriberedFolders.includes(action.payload.collectionId)){
                     state.currentUser.subscriberedFolders.splice( 
                          state.currentUser.subscriberedFolders.findIndex(
                              (collectionId) => collectionId === action.payload.collectionId
                         ),
                    1
                    );
               }
          }
         
       },

       toggleUpload: (state, action) =>{
          state.newUpload = action.payload;
       }

    }
});

export const { loginStart, loginSuccess, loginFailure, logout, favorite, unfavorite, newCollection, deleteCollection, toggleUpload } = userSlice.actions;

export default userSlice.reducer;