import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";

const LoginPage = () => {
  const [formData,setFormData]=useState({
    email:"",
    password:""
  })
  const [loading,setLoading]=useState(false)
  const {setAuthUser}=useAuthContext()
  const navigate=useNavigate()

  const onChangeInput=(e)=>{
    const name=e.target.name
    const value=e.target.value
    setFormData({...formData,[name]:value})
  }
  const onHandleSubmit=async(e)=>{
    e.preventDefault()
    try{
      setLoading(true)
      const response=await axios.post(`/login/`,formData)
    
      if(response?.data==="Invalid user name or password"){
        return toast.error("Invalid user name or password")
      }
      else if(response?.data==="Server Busy"){
        return toast.error("Server Busy")
      }
      else if(response?.status){
        toast.success("Logged in Successfully")
        localStorage.setItem("brainopToken",JSON.stringify(response.data))
        setAuthUser(response.data)
      }
    }
    catch(err){
      console.log(err.message);
      toast.error(err.response.data)
      
    }
    finally{
      setLoading(false)
    }
  }

  return (
    <>
      <section className="bg-gray-50 dark:bg-gray-900">
        
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Log an account
              </h1>
              <form className="space-y-4 md:space-y-6" action="" onSubmit={onHandleSubmit}>
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Your email
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="name@company.com"
                    required
                    onChange={onChangeInput}
                  />
                </div>
                <div>
                  <label
                    
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    placeholder="••••••••"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required
                    onChange={onChangeInput}
                  />
                </div>
                
                
                <button
                  type="submit"
                  className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                >
                  {
                    loading?<span>Loading...</span>
                    :<span>Login</span>
                  }
                </button>
                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                  Don't have an account?{" "}
                  <Link
                    to={"/"}
                    className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                  >
                    Create
                  </Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default LoginPage;
