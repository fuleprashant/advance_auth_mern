import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { FaSpider } from "react-icons/fa";
import { forgotPassword } from "../../services/auth.service";

const Forgotpassword = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  // const onSubmit = async (data) => {
  //   setLoading(true);
  //   try {
  //     const result = await forgotPassword(data);
  //     if (result.status === "success") {
  //       toast.success(result.message);
  //       navigate("/reset-password");
  //     } else {
  //       toast.error("email is not valid ");
  //     }
  //   } catch (error) {
  //     console.error(error);
  //     toast.error("An error occurred while forgot password");
  //   } finally {
  //     setLoading(false);
  //   }
  // };
  const onSubmit = async (data) => {
    setLoading(true);
    console.log("Submitted Data:", data); // Debugging line
    try {
      const result = await forgotPassword(data);
      console.log("API Result:", result); // Debugging line
      if (result.status === "Success") {
        toast.success(result.message);
        navigate("/reset-password");
      } else {
        toast.error("Email is not valid");
      }
    } catch (error) {
      console.error("API Error:", error); // More detailed error logging
      toast.error("An error occurred while forgot password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 max-w-md w-full">
        <h1 className="text-center text-2xl font-bold mb-6">Forgot Password</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label
              className="block text-gray-700 font-bold mb-2"
              htmlFor="email"
            >
              Email Address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
                  message: "Enter a valid email address",
                },
              })}
              className={`appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none ${
                errors.email ? "border-red-500" : ""
              }`}
            />
            {errors.email && (
              <p className="text-red-600">{errors.email.message}</p>
            )}
          </div>
          <button
            type="submit"
            className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            {loading ? (
              <FaSpider className="animate-spin text-2xl" />
            ) : (
              "Reset Password"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Forgotpassword;
