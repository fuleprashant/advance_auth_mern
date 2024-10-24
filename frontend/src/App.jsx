import React from "react";
import {
  createBrowserRouter,
  RouterProvider,
  useNavigate,
} from "react-router-dom";
import Home from "./components/homepage/Home";
import Login from "./components/LoginSection/Login";
import Verify_otp from "./components/LoginSection/Verify_otp";
import Forgot_password from "./components/LoginSection/Forgot_password";
import Reset_password from "./components/LoginSection/Reset_password";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ProtectedRoutes } from "./utils/ProtectedRoutes";

const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <ProtectedRoutes element={<Home />} />,
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/verify-otp",
      element: <Verify_otp />,
    },
    {
      path: "/forgot-password",
      element: <Forgot_password />,
    },
    {
      path: "/reset-password",
      element: <Reset_password />,
    },
  ]);

  return (
    <div>
      <div className="text-2xl bg-red-500">
        here we start the frontend project with react and tailwind css
      </div>
      <RouterProvider router={router} />
      <ToastContainer position="top-right" />
    </div>
  );
};

export default App;
