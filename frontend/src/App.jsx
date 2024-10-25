import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./components/homepage/Home";
import Login from "./components/LoginSection/Login";
import Verify_otp from "./components/LoginSection/Verify_otp";
import Forgot_password from "./components/LoginSection/Forgot_password";
import Reset_password from "./components/LoginSection/Reset_password";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ProtectedRoutes } from "./utils/ProtectedRoutes";
import LoginProtected from "./utils/LoginProtected";
import FirstLayout from "./layouts/FirstLayout";

const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <FirstLayout />,
      children: [
        {
          path: "/",
          element: <ProtectedRoutes element={<Home />} />,
        },
        {
          path: "login",
          element: <LoginProtected element={<Login />} />,
        },
        {
          path: "verify-otp",
          element: <Verify_otp />,
        },
        {
          path: "forgot-password",
          element: <Forgot_password />,
        },
        {
          path: "reset-password",
          element: <Reset_password />,
        },
      ],
    },
  ]);

  return (
    <div>
      <RouterProvider router={router} />
      <ToastContainer position="top-right" />
    </div>
  );
};

export default App;
