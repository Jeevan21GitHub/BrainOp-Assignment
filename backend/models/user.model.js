import mongoose from "mongoose";

const userSchema=new mongoose.Schema({
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
},{collection:"User"})

export const user=mongoose.model("User",userSchema)