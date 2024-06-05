
import mongoose from "mongoose";

const adminSchema=new mongoose.Schema({
    adminname:{
        type:String,
        required:true,
        unique:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true
    },
    profilePicture:{
        type:String,
        default:"https://cdn-icons-png.flaticon.com/512/3135/3135715.png",
    }
},{timestamps:true})


const Admin=mongoose.model('Admin',adminSchema)

export default Admin