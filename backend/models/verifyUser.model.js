import mongoose from "mongoose";

const verifyUserSchema=new mongoose.Schema({
    userName:{
        type:String,
        required:true,
        unique:true,
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
        
    },
  
    token: {
        type: String,
        required: true,
      },
},{collection:"VerifyUser"})

export const verifyUser=mongoose.model("VerifyUser",verifyUserSchema)