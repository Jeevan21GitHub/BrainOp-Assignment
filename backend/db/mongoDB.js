import mongoose from "mongoose";
import dotenv from "dotenv"

dotenv.config()

export const connectMongoDB=async()=>{
   try{
    await mongoose.connect(process.env.MongoDB_URL)
    console.log("Connected MongoDB");
   }
   catch(err){
    console.log(err.message);
   }
}