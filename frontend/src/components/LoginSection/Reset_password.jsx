import React, { useState } from "react";
import { resetPassword } from "../../services/auth.service"; // Import your API call
import { toast } from "react-toastify"; // For notifications
import { useNavigate } from "react-router-dom"; // To redirect the user

const Reset_password = () => {
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const navigate = useNavigate();

  // const handleResetPassword = async (e) => {
  //   e.preventDefault();

  //   if (!otp || !newPassword) {
  //     toast.error("Please fill in all fields.");
  //   }

  //   try {
  //     const response = await resetPassword({
  //       verificationOTP: otp,
  //       newPassword,
  //     });
  //     console.log("th res", response);

  //     if (response.status === "Success") {
  //       toast.success(response.message);
  //       navigate("/login");
  //     } else {
  //       toast.error(response.message || "Failed to reset password");
  //     }
  //   } catch (error) {
  //     toast.error(error.message || "An unexpected error occurred.");
  //   }
  // };

  const handleResetPassword = async (e) => {
    e.preventDefault();

    // Check if fields are filled
    if (!otp || !newPassword) {
      toast.error("Please fill in all fields.");
      return; // Stop execution if fields are empty
    }

    try {
      const response = await resetPassword({
        verificationOTP: otp,
        newPassword,
      });

      console.log("The response:", response);

      // Check for success status in response
      if (response.status === "Success") {
        // Adjust this to match actual response structure
        toast.success(response.message);
        navigate("/login");
      } else {
        toast.error(response.error || "Failed to reset password");
      }
    } catch (error) {
      toast.error(
        error?.response?.data?.message || "An unexpected error occurred."
      );
    }
  };

  return (
    <div className="flex min-h-full flex-1 justify-center px-6 py-12 lg:px-8 mt-32">
      <div className="flex flex-col justify-center w-full max-w-md px-4 py-10 space-y-6 shadow-lg rounded-lg">
        <h2 className="text-center font-bold text-2xl text-gray-900">
          Reset Password
        </h2>
        <form onSubmit={handleResetPassword} className="space-y-6">
          <div>
            <label
              htmlFor="verificationOTP"
              className="block text-sm font-medium text-gray-900"
            >
              Verification OTP
            </label>
            <input
              type="text"
              id="verificationOTP"
              name="verificationOTP"
              required
              placeholder="Enter your verification OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)} // Update verification OTP state
              className="mt-2 block w-full rounded-md border-0 py-1.5 px-2"
            />
          </div>
          <div>
            <label
              htmlFor="newPassword"
              className="block text-sm font-medium text-gray-900"
            >
              New Password
            </label>
            <input
              type="password"
              id="newPassword"
              name="newPassword"
              required
              placeholder="Enter your new password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)} // Update new password state
              className="mt-2 block w-full rounded-md border-0 py-1.5 px-2"
            />
          </div>
          <div>
            <button
              type="submit"
              className="w-full h-10 rounded-md bg-indigo-600 hover:bg-indigo-400 text-white"
            >
              Reset Password
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Reset_password;
