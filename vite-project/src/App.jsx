import React from "react";
import { Navigate, Route, Router, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import { Toaster } from "react-hot-toast";
import { useAuthContext } from "./context/AuthContext";
const App = () => {
  const {authUser}=useAuthContext()
  return (
    
    <>
      <Routes>
        <Route path="/" element={authUser?<Navigate to={"/home"}/>:<SignupPage />} />
        <Route path="/home" element={authUser?<HomePage/>:<Navigate to={"/login"}/>} />
        <Route path="/login" element={authUser?<Navigate to={"/home"}/>:<LoginPage />} />
      </Routes>
      <Toaster />
    </>
  );
};

export default App;
