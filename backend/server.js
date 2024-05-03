import express from "express"
import dotenv from "dotenv"
import { connectMongoDB } from "./db/mongoDB.js"
import signupRouter from "./router/signup.router.js"
import loginRouter from "./router/login.router.js"
import homeRouter from "./router/home.router.js"
import cors from 'cors'
import path from 'path'

dotenv.config()
const app=express()

const PORT=5000

const __dirname=path.resolve()

app.use(cors({origin:"*"}))
app.use(express.json())

// app.get("/",(req,res)=>{
//     res.status(200).json({"Message":"hi"});
// })

app.use("/home",homeRouter)
app.use("/signup",signupRouter)
app.use("/login",loginRouter)

app.use(express.static(path.join(__dirname,"vite-project","dist")))

app.get("*",(req,res)=>{
    res.sendFile(path.join(__dirname,"vite-project","dist","index.html"))
})


app.listen(PORT,()=>{
    console.log("App running port"+PORT);
    connectMongoDB()
})
