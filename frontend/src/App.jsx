import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./components/homepage/Home";
import Login from "./components/LoginSection/Login";
import Verify_otp from "./components/LoginSection/Verify_otp";
import Forgot_password from "./components/LoginSection/Forgot_password";
import Reset_password from "./components/LoginSection/Reset_password";

const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />, // later we apply a protected route here
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
    </div>
  );
};

export default App;
