import React from "react";
import Header from "./header/Header";
import Navbar from "./navbar/Navbar";

const MainLayout = ({ children }) => {
  return (
    <>
      <Navbar />
      <Header />
      {children}
    </>
  );
};

export default MainLayout;
