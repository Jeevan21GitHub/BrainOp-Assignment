import React from "react";

const PostList = ({ postData }) => {
  return (
    <>
      <div>
        <div className="text-center font-bold text-3xl mt-10 mb-3 hover:text-blue-600 cursor-pointer">Posts</div>
        <div className="flex flex-wrap justify-center items-center ml-10 mr-10 cursor-pointer">
          {Object.values(postData).map((post, index) => (
            <div key={index} className="border h-60 w-full md:w-72 mr-3 p-4 rounded mb-3 shadow hover:scale-105 hover:border-green-200 hover:shadow-green-300 duration-300">
              <div className="">
                <div>
                  <h2 className="font-semibold mb-1 text-gray-900 text-center">{post.title}</h2>
                </div>
                <div>
                  <p className="text-gray-700">{post.body}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default PostList;
