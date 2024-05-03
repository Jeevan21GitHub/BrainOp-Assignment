import express from "express"
import { authenticationUser } from "../controller/login.controller.js"

const router=express.Router()

router.post("/",async(req,res)=>{
    try{
        const {email,password}=req.body
        const isValidUser=await authenticationUser(email,password);
        if(isValidUser==="Invalid user name or password"){
            res.status(400).send("Invalid user name or password")
        }
        else if(isValidUser==="Server Busy"){
            res.status(400).send("Server Busy")
        }
        else{
            res.status(200).json({token:isValidUser.token})
        }
    }
    catch(err){
        console.log(err.message);
    }
})

export default router

