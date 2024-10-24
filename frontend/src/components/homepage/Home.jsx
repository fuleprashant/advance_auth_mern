import React from "react";
// import heroImage from "./path-to-your-image.jpg"; // Replace with your image path
import todo from "../../assets/download (3).png";
import { useSelector } from "react-redux";

const Hero = () => {
  const users = useSelector((state) => state.auth.user);
  console.log(users?.name);
  // console.log(user?.email);
  return (
    <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white h-screen flex items-center">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 h-full">
        {/* Text Section */}
        <div className="flex flex-col items-start justify-center p-8">
          <h1 className="text-5xl font-bold mb-4">
            Welcome to Your To-Do App{" "}
            <p className="mt-3 text-red-800">{users?.name}</p>
          </h1>
          <p className="mb-8 text-lg">
            Manage your tasks efficiently and effectively.
          </p>
          <div className="flex space-x-4">
            <button className="bg-white text-blue-500 font-semibold py-2 px-4 rounded-lg shadow-lg transition duration-300 hover:bg-gray-200">
              Create To-Do
            </button>
            <button className="bg-white text-blue-500 font-semibold py-2 px-4 rounded-lg shadow-lg transition duration-300 hover:bg-gray-200">
              List of To-Dos
            </button>
          </div>
        </div>

        {/* Image Section */}
        <div className="hidden md:flex items-center justify-center">
          <img
            src={todo}
            alt="Hero"
            className="object-cover h-full w-full rounded-lg"
          />
        </div>
      </div>
    </div>
  );
};

export default Hero;
