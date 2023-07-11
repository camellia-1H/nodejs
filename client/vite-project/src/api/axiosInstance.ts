import axios from "axios";
import jwt_decode, { JwtPayload } from "jwt-decode";
import { User } from "../types/User";
import { refreshToken } from "./request";

export const axiosInstance = axios.create({
  baseURL: "http://localhost:8080/",
});

export const createAxiosJWT = (user: User) => {
  const newAxiosInstance = axios.create({
    baseURL: "http://localhost:8080/",
  });
  newAxiosInstance.interceptors.request.use(
    async (config) => {
      // 2 cách : 1 cách trong auth : verify , 1 cách decode
      const decodeToken = jwt_decode<JwtPayload>(user?.accessToken);

      if ((decodeToken.exp as number) < new Date().getTime() / 1000) {
        const data = await refreshToken();
        console.log(data);
        const refreshUser = {
          ...user,
          accessToken: data.accessToken,
        };
        config.headers["token"] = `Bearer ${data.accessToken}`;
      }
      return config;
    },
    (err) => {
      return Promise.reject(err);
    }
  );
  return newAxiosInstance;
};
