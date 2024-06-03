import User from "../models/user.model.js"
import { errorHandler } from "../utils/error.js"
import bcryptjs from 'bcryptjs'


export const test=(req,res)=>{
    res.json({message:"API is working"})
}

//update user

export const updateUser=async(req,res,next)=>{
    console.log("update user step 1");
    console.log("params id",req.params.id);
    console.log("body is",req.body);
    if(req.user.id!==req.params.id)
    {
        console.log("update user step 2");
        return next(errorHandler(401,"You can update only account !"))
    }
    try {
        console.log("update user step 3");
        if(req.body.password) {
            console.log("update user step 4");
            req.body.password= bcryptjs.hashSync(req.body.password,10)
        }
        console.log("update user step 5")
        const updatedUser=await User.findByIdAndUpdate(
            req.params.id,
            {
                $set:{
                    username:req.body.username,
                    email:req.body.email,
                    profilePicture:req.body.profilePicture
                },
            },
            {new:true}
        );
        console.log("the user new details is",updatedUser);
        console.log("update user step 6");
        const {password,...rest}=updatedUser._doc;
        console.log("update user step 7");
        res.status(200).json(rest)
    } catch (error) {
        next(error)
    }
}

 
export const deleteUser=async(req,res)=>{
    if(req.user.id!==req.params.id)
    {
        return next(errorHandler(401,"You can delete only your account !"))
    }
    try {
        await User.findByIdAndDelete(req.params.id)
        res.status(200).json("User has been deleted...")
    } catch (error) {
        next(error)
    }
}

