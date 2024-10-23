import React, { useState } from "react";
import logo from "../../assets/download (1).png";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

const Login = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const signInSchema = yup.object().shape({
    email: yup
      .string()
      .email("Invalid email format")
      .required("Email is required"),
    password: yup
      .string()
      .min(6, "Password must be at least 6 characters")
      .required("password must be required"),
  });

  const signUpSchema = yup.object().shape({
    name: yup.string().required("name is required"),
    email: yup
      .string()
      .email("Invalid email format")
      .required("Email is required"),
    password: yup
      .string()
      .min(6, "Password must be at least 6 characters")
      .required("password must be required"),
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { error },
  } = useForm({
    resolver: yupResolver(isSignUp ? signUpSchema : signInSchema),
  });

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
      {/* here we start the react-hook-form */}
    </div>
  );
};

export default Login;
