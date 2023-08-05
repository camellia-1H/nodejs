import { AxiosInstance } from "axios";
import { axiosInstance } from "./axiosInstance";
import { AnyAction } from "@reduxjs/toolkit";
import { Dispatch } from "react";
import {
  deleteUserFailed,
  deleteUserSuccess,
  getAllUserSuccess,
  getAllUserFailed,
} from "../redux/userSlice";

const loginUser = async (email: string, password: string) => {
  try {
    const res = await axiosInstance.post("/users/login", {
      email,
      password,
    });
    // console.log(res.data);
    return res.data;
  } catch (error) {
    return error;
  }
};

const registerUser = async (
  name: string,
  email: string,
  password: string,
  phoneNumber: string
) => {
  try {
    const res = await axiosInstance.post("/users/register", {
      name,
      email,
      password,
      phoneNumber,
    });
    // console.log(res.data);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

const getAllUser = async (
  accessToken: string,
  axiosJWT: AxiosInstance,
  dispatch: Dispatch<AnyAction>
) => {
  try {
    const res = await axiosJWT.get("/users", {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    dispatch(getAllUserSuccess(res.data.data));
  } catch (error) {
    dispatch(getAllUserFailed());
  }
};

const logOut = async (accessToken: string, id: string) => {
  try {
    await axiosInstance.post("/users/logout", id, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
  } catch (error) {
    console.log(error);
  }
};

const deleteUser = async (
  accessToken: string,
  id: string,
  axiosJWT: AxiosInstance,
  dispatch: Dispatch<AnyAction>
) => {
  try {
    const result = await axiosJWT.delete(`/users/delete/${id}`, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    dispatch(deleteUserSuccess(result.data));
    getAllUser(accessToken, axiosJWT, dispatch);
  } catch (error) {
    dispatch(deleteUserFailed(error));
  }
};

const refreshToken = async () => {
  try {
    const res = await axiosInstance.post("/users/refresh", {
      withCredentials: true,
    });
    return res.data;
  } catch (e) {
    console.log(e);
  }
};

export {
  loginUser,
  registerUser,
  getAllUser,
  logOut,
  refreshToken,
  deleteUser,
};
