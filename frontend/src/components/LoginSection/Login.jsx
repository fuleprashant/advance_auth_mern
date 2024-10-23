import React, { useState } from "react";
import logo from "../../assets/download (1).png";

const Login = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="flex min-h-full flex-1 justify-center px-6 py-12 lg:px-8 mt-32">
      <div className="flex flex-col justify-center w-[1254px] px-4 py-10 md:px-0 space-y-6 shadow-lg rounded-l-lg ">
        <img
          src={logo}
          alt="your company logo"
          className="mx-auto h-10 w-auto"
        />
        <h2 className="text-center mt-10 font-bold text-2xl text-gray-900">
          {isSignUp ? "Create your account" : "sign in to your account"}
        </h2>
      </div>
    </div>
  );
};

export default Login;
