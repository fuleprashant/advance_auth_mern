import React, { useState } from "react";
import logo from "../../assets/download (1).png";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useDispatch } from "react-redux";

import { authRequest, authSuccess } from "../../redux/authSlice";
import { signInUser, signUpUser } from "../../services/auth.service";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
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
    errors,
  } = useForm({
    resolver: yupResolver(isSignUp ? signUpSchema : signInSchema),
  });

  // create a toggle function for the sign-up and sign-in
  const toggleSignUp = () => {
    setIsSignUp(!isSignUp);
  };

  const togglepassword = () => {
    setShowPassword(!showPassword);
  };

  // api calling for the signup and signin

  const onSubmit = async (data) => {
    dispatch(authRequest());
    try {
      if (isSignUp) {
        const result = await signUpUser(data);
        console.log("signup fucntion", result);

        if (result.status === "Success") {
          dispatch(authSuccess(result.data));
          toast.success(result.message);
          navigate("/verify-otp");
        } else {
          toast.error(result.message);
        }
      } else {
        const result = await signInUser(data);
        console.log("the loginfunction  is", result);
        localStorage.setItem("user-info", JSON.stringify(result));
        if (result.status === "Success") {
          toast.success(result.message);
          navigate("/");
        } else {
          toast.error(
            result.error.message ||
              "Login failed . please check your email and password"
          );
        }
      }
    } catch (error) {
      toast.error("An unexpectd error occurred. please try again later");
      console.error(error);
    } finally {
      reset();
    }
  };

  return (
    <div className="flex min-h-full flex-1 justify-center px-6 py-12 lg:px-8 mt-32">
      <div className="flex flex-col justify-center w-[1254px] px-4 py-10 md:px-0 space-y-6 shadow-lg rounded-l-lg ">
        <div>
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

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {isSignUp && (
              <div>
                <label
                  htmlFor="name"
                  className="flex text-sm font-medium text-gray-900"
                >
                  name
                </label>
                <div className="mt-2">
                  <input
                    id="name"
                    name="name"
                    type="text"
                    {...register("name")}
                    className="block w-full rounded-md border-0 py-1.5 px-2 bg-blue-50"
                  />
                  {errors?.name && (
                    <p className="text-red-600">{errors?.name.message}</p>
                  )}
                </div>
              </div>
            )}
            <div>
              <label
                htmlFor="name"
                className="flex text-sm font-medium text-gray-900"
              >
                email
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  {...register("email")}
                  className="block w-full rounded-md border-0 py-1.5 px-2"
                />
                {errors?.name && (
                  <p className="text-red-600">{errors?.name.message}</p>
                )}
              </div>
            </div>
            <div>
              <label
                htmlFor="name"
                className="flex text-sm font-medium text-gray-900"
              >
                password
              </label>
              <div className="mt-2 relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  {...register("password")}
                  className="block w-full rounded-md border-0 py-1.5 px-2"
                />
                <div
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm cursor-pointer"
                  onClick={togglepassword}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </div>
                {errors?.name && (
                  <p className="text-red-600">{errors?.name.message}</p>
                )}
              </div>
            </div>
            {!isSignUp && (
              <div className="text-sm flex mt-2">
                <button
                  className="font-semibold text-indigo-600 hover:text-indigo-400"
                  onClick={() => navigate("/forgot-password")}
                >
                  Forgot Password
                </button>
              </div>
            )}
            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 hover:bg-indigo-400 h-10 text-center"
              >
                <p className="mt-2">
                  {isSignUp ? "create Account" : "Sign In"}
                </p>
              </button>
            </div>
          </form>
          <p className="mt-5 text-center text-sm text-gray-500">
            {isSignUp ? "Already have an accoun !" : "not a account ?"}
            <button onClick={toggleSignUp}>
              {isSignUp ? "Sign in" : "Create Account"}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
