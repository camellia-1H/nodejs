import axios from "axios";
import jwt_decode, { JwtPayload } from "jwt-decode";
import { User } from "../types/User";
import { refreshToken } from "./request";
import { Dispatch } from "react";
import { AnyAction } from "@reduxjs/toolkit";
import { loginSuccess } from "../redux/authSlice";

export const axiosInstance = axios.create({
  baseURL: "http://localhost:8080/",
  // withCredentials: true,
});

export const createAxiosJWT = (user: User, dispatch: Dispatch<AnyAction>) => {
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
          accessToken: data?.accessToken,
        };
        dispatch(loginSuccess(refreshUser));
        config.headers["authorization"] = `Bearer ${data.accessToken}`;
      }
      return config;
    },
    (err) => {
      return Promise.reject(err);
    }
  );
  return newAxiosInstance;
};
