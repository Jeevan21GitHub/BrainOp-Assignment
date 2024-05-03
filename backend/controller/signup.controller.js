import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { verifyUser } from "../models/verifyUser.model.js";
import { user } from "../models/user.model.js";
import { sendMail } from "./sendMail.controller.js";

dotenv.config();

export const insertVerifyUser = async (userName, email, password) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const token = generateToken(email);

    const newUser = new verifyUser({
      userName,
      email,
      password: hashedPassword,
      token,
    });

    const activationLink = `http://localhost:5000/signup/${token}`;
    const content = `<h4>Verification Link BrainOp</h4>
        <a href="${activationLink}">Click here</a>
        `;
    sendMail(email, "VerifyUser", content);
    await newUser.save();
  } catch (err) {
    console.log(err.message);
  }
};

const generateToken = (email) => {
  const token = jwt.sign(email, process.env.JWT_TOKEN);
  return token;
};

export const insertSignupUser = async (token) => {
  try {
    const signUpUser = await verifyUser.findOne({ token: token });
    if (signUpUser) {
      const newUser = new user({
        userName: signUpUser.userName,
        email: signUpUser.email,
        password: signUpUser.password,
        token: signUpUser.token,
      });
      await newUser.save();
      await signUpUser.deleteOne({ token: token });
      const content = `<h4>hi,there </h4>
            <h5>Welcome to the app</h5>
            <p>you are successfully registered</p>
            <p>Regard</p>
            <p>Team</p>`;
      sendMail(newUser.email, "Registeration successfully", content);
      return `<h4>hi,there </h4>
            <h5>Welcome to the app</h5>
            <p>you are successfully registered</p>
            <p>Regard</p>
            <p>Team</p>`;
    }
    return `<h4>Link expired.... </h4>
        <p>Regard</p>
        <p>Team</p>`;
  } catch (err) {
    console.log(err.message);
    return `<html>
        <body>
        <h4>Unexpected Error......</h4>
        <p>Regard</p>
        <p>Team</p>
        </body>
    </html>`;
  }
};
