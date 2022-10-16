import axios from "axios";
import { checkTokenValidity, getUser } from "./util";

export const instance = axios.create({
  baseURL: "http://localhost:3001",
});

instance.interceptors.request.use(async (request) => {
  const token = localStorage.getItem("token");
  const refreshToken = localStorage.getItem("refresh_token");

  if (!token) return request;

  request.headers.Authorization = `Bearer ${token}`;

  const isExpired = checkTokenValidity();
  if (!isExpired) return request;
  const { data } = await axios.post("http://localhost:3001/users/refresh", {
    refresh_token: refreshToken,
  });
  localStorage.setItem("token", data.token);
  request.headers.Authorization = `Bearer ${data.token}`;
  return request;
});
