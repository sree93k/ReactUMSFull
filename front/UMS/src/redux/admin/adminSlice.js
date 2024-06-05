import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentAdmin: null,
  loading: false,
  error: false,
  isLogged:false,
};

const adminSlice = createSlice({
  name: 'admin',
  initialState,
  reducers: {
    signInStart:(state)=>{
      state.loading=true
      state.error=false
      state.isLogged=true
  },
  signInSuccess:(state,action)=>{
      state.currentAdmin=action.payload
      state.loading=false
      state.error=false
      state.isLogged=true
  },
  signInFailure:(state,action)=>{
      state.loading=false
      state.error=action.payload
  },
 updateAdminStart:(state)=>{
      state.loading=true
 },
 updateAdminSuccess:(state,action)=>{
      state.currentAdmin=action.payload
      state.loading=false
      state.error=false
 },
 updateAdminFailure:(state,action)=>{
      state.loading=false
      state.error=action.payload;
  },
  deleteAdminStart:(state)=>{
      state.loading=true
 },
 deleteAdminSuccess:(state)=>{
      state.currentAdmin=null
      state.loading=false
      state.error=false
 },
 deleteUserFailure:(state,action)=>{
      state.loading=false
      state.error=action.payload;
  },
  signOut:(state)=>{
      state.currentAdmin=null
      state.loading=false
      state.error=false
      state.isLogged=false
  }
  },
});

export const {
  signInStart,
  signInSuccess,
  signInFailure,
  updateAdminFailure,
  updateAdminStart,
  updateAdminSuccess,
  deleteAdminStart,
  deleteUserFailure,
  deleteAdminSuccess,
  signOut,
} = adminSlice.actions;

export default adminSlice.reducer;
