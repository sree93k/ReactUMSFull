import Admin from "../models/admin.model.js"
import { errorHandler } from "../utils/error.js"
import bcryptjs from 'bcryptjs'
import User from '../models/user.model.js'
import { ObjectId } from "mongoose"
export const test=(req,res)=>{
    res.json({message:"API is working"})
}

export const allUsers=async(req,res,next)=>{
    try {
        console.log("all users admin controller");
        const allUsers = await User.find({});
        console.log("all users are",allUsers);
        res.status(200).json(allUsers)
    } catch (error) {
        console.log(error);
        next(error)
    }
}

export const updateAdmin=async(req,res,next)=>{
    if(req.admin.id!==req.params.id)
    {
        return next(errorHandler(401,"You can update only account !"))
    }
    try {
        if(req.body.password) {
            req.body.password= bcryptjs.hashSync(req.body.password,10)
        }

        const updatedAdmin=await Admin.findByIdAndUpdate(
            req.params.id,
            {
                $set:{
                    adminname:req.body.adminname,
                    email:req.body.email,
                    password:req.body.password,
                    profilePicture:req.body.profilePicture
                },
            },
            {new:true}
        );
        console.log("admin details",updateAdmin);
        const {password,...rest}=updatedAdmin._doc;
        res.status(200).json(rest)
    } catch (error) {
        next(error)
    }
}

export const updateVerifiedStatus=async(req,res,next)=>{
    console.log("step 1");
    try {
        console.log("step 2");
        const userID=req.params.id
        console.log("verifdied statys",req.body.verified);
        const verified=req.body.verified
        console.log("userID is",userID);
        console.log("step 3");
       
        const currentUser = await User.findByIdAndUpdate(
            { _id: userID }, 
            { $set: { verified: verified } },
            { new: true }
          );
          console.log("step 4");
        console.log("current User",currentUser);
        console.log("step 5");
        res.status(200).json()
        console.log("step 6");
    } catch (error) {
        console.log("erorr is",error);
        next(error)
    }
}

export const editUser=async(req,res,next)=>{
    try {
        console.log("edit user started");

        const userID=req.params.id;
        console.log("res aprams is",userID);
        const userDetails=await User.findById({_id:userID})
        console.log("user detaiuks",userDetails);
        res.status(200).json(userDetails)
    } catch (error) {
        next(error)
    }
}


export const updateUser=async(req,res,next)=>{
    console.log("admin update user step 1");
    console.log("params id",req.params.id);
    console.log("body is",req.body);
    if(req.body._id!==req.params.id)
    {
        console.log("update user step 2");
        return next(errorHandler(401,"You can update only account !"))
    }
    try {
        console.log("update user step 3");
        // if(req.body.password) {
        //     console.log("update user step 4");
        //     req.body.password= bcryptjs.hashSync(req.body.password,10)
        // }
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
        console.log(error);
        next(error)
    }
}

export const updatePassword=async(req,res,next)=>{
    try {
        console.log("admin updating user password started ....");
        console.log(req.params.id);
        const userID=req.params.id 
        console.log(req.body);
        console.log("pass1",req.body.new_password);
        const password1=req.body.new_password
        const password2=req.body.re_enter_password
        console.log("step1 ");
        if(req.params.id)
        {
            console.log("step 2 ");
            if(password1===password2)
            {
                console.log(userID);
                console.log(password1);
                console.log(password2);
                const passwords=bcryptjs.hashSync(password1,10)
                console.log("step 3 ");
             
              const userData=await User.findByIdAndUpdate(
                userID,
                {
                    $set:{
                       password:passwords
                    },
                },
                {new:true}
            );
            console.log("step 3.1 ");
            const {password,...rest}=userData._doc;
            console.log("step 3.2 ");
            res.status(200).json(rest)
            }
            else
            {
                console.log("step 4 ");
                next("Password Not Matching")
            }
        }
        else
        {
            console.log("step 5 ");
           next("Error Occured")
        }
        
    } catch (error) {
        console.log("step 6 ");
        next(error)
    }
}
