import React from "react";
import LoginForm from "../login/LoginForm";
import { Link } from "react-router-dom";

const index = () => {
  return (
    <div>
      <LoginForm />
      <h1>
        DON'T HAVE AN ACCOUNT ? <Link to="/register">REGISTER </Link>
      </h1>
    </div>
  );
};

export default index;
