
import { user } from "../models/user.model.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import dotenv from "dotenv"

dotenv.config()

export const checkUser=async(email)=>{
    try{
        const existingUser=await user.findOne({email:email})
        if(existingUser){
            return true
        }
        return false
    }
    catch(err){
        console.log(err);
        return "Server Busy"
    }
}

export const authenticationUser=async(email,password)=>{
    try{
        const userCheck=await user.findOne({email:email})
        if(userCheck){
            const validPassword=await bcrypt.compare(password,userCheck.password);
            if(validPassword){
                const token=jwt.sign({email},process.env.JWT_TOKEN)
                const response={
                    id:userCheck._id,
                    userName:userCheck.userName,
                    email:userCheck.email,
                    token:token,
                    status:true
                }
                await user.findOneAndUpdate({email:userCheck.email},{$set:{token:token}},{new:true})
                return response
            }
            return "Invalid user name or password"
        }
        return "Invalid user name or password"
        
    }
    catch(err){
        console.log(err.message);
        return "Server Busy"
    }
}

export const authorizeUser=async(token)=>{
    try{
        const decodedToken=jwt.verify(token,process.env.JWT_TOKEN)
        if(decodedToken){
            const email=decodedToken.email
            const data=await user.findOne({email:email}).select("-password -token -_id")
            return data
        }
        return false
    }
    catch(err){
        console.log(err.message);
        return "Server Busy"
    }
}