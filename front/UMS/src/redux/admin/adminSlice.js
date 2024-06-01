import { createSlice } from "@reduxjs/toolkit";

const initialState={
    currentAdmin:null,
    loading:false,
    error:false
}

const adminSlice=createSlice({
    name:"admin",
    initialState,
    reducers:{
        signInStart:(state)=>{
            state.loading=true
            state.error=false
        },
        signInSuccess:(state,action)=>{
            state.currentAdmin=action.payload
            state.loading=false
            state.error=false
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
       deleteAdminFailure:(state,action)=>{
            state.loading=false
            state.error=action.payload;
        },
        signOut:(state)=>{
            state.currentAdmin=null
            state.loading=false
            state.error=false
        }

    }

})

export const {
    signInStart,
    signInSuccess,
    signInFailure,

    updateAdminStart,
    updateAdminSuccess,
    updateAdminFailure,
    deleteAdminStart,

    deleteAdminSuccess,
    deleteAdminFailure,
    signOut
}=adminSlice.actions;



console.log("adminSlice",adminSlice);
export default adminSlice.reducer;