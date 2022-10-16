import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { instance } from "../app/instance";
import { checkTokenValidity, getUser } from "../app/util";

export const userContext = createContext();

export const UserContextProvider = ({ children }) => {
  const [userData, setUserData] = useState(() => {
    return !checkTokenValidity() ? getUser() : null;
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const authenticate = async (userData, url) => {
    try {
      setLoading(true);
      const { data } = await instance.post(url, userData);
      localStorage.setItem("token", data.token);
      localStorage.setItem("refresh_token", data.refreshToken);
      setUserData(data.user);
      navigate(`/profile/${data.user.firstName}`, {
        state: { id: data.user._id },
      });
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("refresh_token");
    setUserData(null);
    navigate("/");
  };
  return (
    <userContext.Provider value={{ authenticate, userData, logout }}>
      {children}
    </userContext.Provider>
  );
};
