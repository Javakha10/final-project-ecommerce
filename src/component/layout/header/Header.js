import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getUser, isUserAdmin } from "../../../app/util";
import { userContext } from "../../../context/UserContext";

const Header = () => {
  const { userData, logout } = useContext(userContext);
  const navigate = useNavigate();
  const navigateToProfile = () => {
    navigate(`profile/${userData.firstName}`, { state: { id: userData._id } });
  };
  return (
    <div className="Header">
      <Link to="/">Home</Link>
      <br />
      <Link to="/cart">Cart</Link>
      <br />
      {userData ? (
        <>
          <h1>Hello, {userData.firstName}</h1>
          <button onClick={navigateToProfile}>PROFILE</button>
          <button onClick={logout}>LOGOUT</button>
        </>
      ) : (
        <>{!getUser() && <Link to="/register">REGISTER</Link>}</>
      )}
      {isUserAdmin() && <Link to="/products/new">ADD PRODUCT</Link>}
    </div>
  );
};

export default Header;
