import React from "react";
import Navbar from "../components/homepage/Navbar";
import { Outlet } from "react-router-dom";

const FirstLayout = () => {
  return (
    <div>
      <Navbar />
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default FirstLayout;
