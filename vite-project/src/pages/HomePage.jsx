import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import PostList from "../components/PostList";
import { useAuthContext } from "../context/AuthContext";
import { Link } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";
import Spinner from "../components/Spinner";

const HomePage = () => {
  const [userData, setUserData] = useState({});
  const [postData, setPostData] = useState([]);
  const [page, setPage] = useState(1  );
  const [hasMore, setHasMore] = useState(true);
  const { setAuthUser } = useAuthContext();
  useEffect(() => {
    const userToken = JSON.parse(localStorage.getItem("brainopToken"));
    if (userToken) {
      getData(userToken.token);
    }
  }, []);

  const getData = async (userToken) => {
    try {
      const response = await axios.get(`/home/`, {
        headers: {
          Authorization: userToken,
        },
      });
      if (response?.data === "Invalid Token") {
        toast.error("Invalid Token");
      } else if (response?.data === "Server Busy") {
        toast.error("unauthorized access");
        localStorage.removeItem("brainopToken");
        setAuthUser(null);
      } else if (response?.status) {
        setUserData(response.data);
        const response2 = await fetch(
          "https://jsonplaceholder.typicode.com/posts?_page=1&_limit=20"
        );
        const data2 = await response2.json();
        setPostData(data2);
      }
    } catch (err) {
      console.log(err.message);
      toast.error(err.message);
    }
  };
  const onHandleLogout = () => {
    localStorage.removeItem("brainopToken");
    setAuthUser(null);
    toast.success("Logged out Successfully");
  };
  const getMorePost=async()=>{
    try{
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/posts?_page=${page}&_limit=20`
      );
      const data= await response.json();
      setPostData(data);
      return data;
    }
    catch(err){
      console.log(err);
      
    }
  }
  const fetchMoreData=async()=>{
    try{
      const data=await getMorePost()
    setPostData([...postData,...data])
    if(data.length===0||data.length<20){
      setHasMore(false)
    }
    setPage(page+1)
    }
    catch(err){
      console.log(err);
    }
  }
  return (
    <>
      <section>
        <div className="mt-2">
          <div className="flex justify-between ml-10 mr-10">
            <div>
              <h1 className="font-bold text-xl md:text-3xl hover:text-green-900 cursor-pointer">
                <Link to={"/home"}>{userData.userName}</Link>
              </h1>
            </div>
            <div>
              <button
                className="font-bold bg-red-700 text-white py-1 px-2 rounded cursor-pointer hover:bg-red-500 duration-300"
                onClick={onHandleLogout}
              >
                Logout
              </button>
            </div>
          </div>
          <div>
            <InfiniteScroll
              dataLength={postData.length}
              next={fetchMoreData}
              hasMore={hasMore}
              loader={<Spinner/>}
              endMessage={<p className="text-center text-blue-600">No More Messages</p>}
            >
              <PostList postData={postData} />
            </InfiniteScroll>
          </div>
        </div>
      </section>
    </>
  );
};

export default HomePage;
