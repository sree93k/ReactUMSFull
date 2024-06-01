import Admin from "../models/admin.model.js"
import { errorHandler } from "../utils/error.js"
import bcryptjs from 'bcryptjs'

export const test=(req,res)=>{
    res.json({message:"API is working"})
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
        const {password,...rest}=updatedAdmin._doc;
        res.status(200).json(rest)
    } catch (error) {
        next(error)
    }
}


export const updateUser=async()=>{
    try {
        
    } catch (error) {
        
    }

}


