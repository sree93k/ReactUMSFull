import User from "../models/user.model.js"
import { errorHandler } from "../utils/error.js"
import bcryptjs from 'bcryptjs'
import validator from 'validator';

export const test=(req,res)=>{
    res.json({message:"API is working"})    
}

//update user

export const updateUser=async(req,res,next)=>{
    console.log("update user step 1");
   
    console.log("body is",req.body);
    console.log("params id",req.params.id);
    console.log(req.user.id);
    if(req.user.id!==req.params.id)
    {
        console.log("update user step 2");
        return next(errorHandler(401,"You can update only account !"))
    }
    const userAccount=await User.findById(req.params.id)
    const nameCompare=validator.equals(req.body.username,userAccount.username)
    const emailCompare=validator.equals(req.body.email,userAccount.email)
    const profileCompare=validator.equals(req.body.profilePicture,userAccount.profilePicture)
    if(nameCompare && emailCompare && profileCompare)
    {
        console.log("no chnage found");
        return next(errorHandler(401,"No changes Found"))
    }

    const emailValidator=validator.isEmail(req.body.email)
    const nameValidator=validator.isAlpha(req.body.username)

   
    if(!emailValidator || !nameValidator)
    {
        console.log("eerros validation");
        return next(errorHandler(401,"Invalid Inputs!"))
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
        next(error)
    }
}

 
export const deleteUser=async(req,res,next)=>{
    if(req.user.id!==req.params.id)
    {
        return next(errorHandler(401,"You can delete only your account !"))
    }
    try {
        await User.findByIdAndDelete(req.params.id)
        res.clearCookie('access_token').status(200).json('User has been deleted');
    } catch (error) {
        next(error)
    }
}


export const updatePassword=async(req,res,next)=>{
    if(req.user.id!==req.params.id)
    {
        return next(errorHandler(401,"You can delete only your account !"))
    }
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
            const comparePassword=validator.equals(password1,password2)
            const strongPassword=validator.isStrongPassword(password1)
            console.log("step 2 ");
            if(!comparePassword)
            {
                console.log("eerros validation 1");
                return next(errorHandler(401,"Password Not Matching"))
            }
            else if(!strongPassword)
            {
                console.log("eerros validation 2");
                return next(errorHandler(401,"Password must contain min 8 character, min 1 UpperCase , 1 LowerCase and min 1 Symbol"))
            }
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
            console.log("step 5 ");
            res.status(404).json("Error Occured")
        }
        
        
    } catch (error) {
        next(error)
    }
}

