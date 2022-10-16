import React from "react";
import { Link } from "react-router-dom";
import RegistrationForm from "./RegistrationForm";
const index = () => {
  return (
    <div>
      <RegistrationForm />
      <h1>
        ALREADY HAVE AN ACCOUNT ? <Link to="/login">LOGIN</Link>
      </h1>
    </div>
  );
};

export default index;
