
import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export const ProtectedRoutes = ({ element }) => {
  const { isAuthenticate } = useSelector((state) => state.auth);
  console.log("the protected route", isAuthenticate);

  // Return the element if authenticated, otherwise redirect to login
  return isAuthenticate ? element : <Navigate to="/login" />;
};
