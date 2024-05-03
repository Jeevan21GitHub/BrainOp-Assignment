import nodemailder from "nodemailer"
import dotenv from "dotenv"
dotenv.config()
const transporter=nodemailder.createTransport({
    service:"gmail",
    auth:{
        user:process.env.nodemailer_user,
        pass: process.env.nodemailer_pass,
    }
})

export const sendMail=(toEmail,subject,content)=>{
    const mailOption={
        from:process.env.nodemailer_user,
        to:toEmail,
        subject:subject,
        html:content
    }
    transporter.sendMail(mailOption,(err,info)=>{
        if(err){
            console.log(err.message);
        }
        else{
            console.log(info.response);
        }
    })
}