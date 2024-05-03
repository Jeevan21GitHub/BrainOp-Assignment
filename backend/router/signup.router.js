import express from "express"
import { checkUser } from "../controller/login.controller.js";
import { insertSignupUser, insertVerifyUser } from "../controller/signup.controller.js";

const router=express.Router()

router.get("/:token",async(req,res)=>{
    try{
        const response=await insertSignupUser(req.params.token)
        res.status(200).send(response)
    }
    catch(err){
        console.log(err.message);
        res.status(500).send(`<html>
        <body>
        <h4>GET: Link Expired....</h4>
        <h5>Welcome to the app</h5>
        <p>you are not successfully registered</p>
        <p>Regard</p>
        <p>Team</p>
        </body>
    </html>`)
    }
})

router.post("/verify",async(req,res)=>{
    try{
        const {userName,email,password,confirmPassword}=await req.body;
        if(password!==confirmPassword){
            return res.status(400).send("Password not match")
        }
        const registerUser=await checkUser(email)
        if(registerUser===false){
             await insertVerifyUser(userName,email,password,confirmPassword)
             res.status(200).send(true)
        }
        else if(registerUser===true){
            res.status(200).send(false)
        }
        else if(registerUser==="Server Busy"){
            res.status(500).send("Server Busy")
        }

    }
    catch(err){
        console.log(err.message);
    }
})

export default router