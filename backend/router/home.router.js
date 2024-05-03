    import express from "express"
    import { authorizeUser } from "../controller/login.controller.js"

    const router=express.Router()

    router.get("/",async(req,res)=>{
        try{
            const auth_token=req.headers.authorization
            const loginCredentials=await authorizeUser(auth_token)
            if(loginCredentials===false){
                res.status(400).send("Invalid Token")
            }
            else{
                res.json(loginCredentials)
            }
        }
        catch(err){
            console.log(err.message);
            res.status(400).send("Server Busy")
        }
    })

    export default router