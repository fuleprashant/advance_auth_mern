import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const LoginProtected = ({ element }) => {
  const { isAuthenticate } = useSelector((state) => state.auth);
  console.log("the login authenticate", isAuthenticate);

  // If authenticated, redirect to the home page; otherwise, render the login element
  return isAuthenticate ? <Navigate to="/" /> : element;
};

export default LoginProtected;
