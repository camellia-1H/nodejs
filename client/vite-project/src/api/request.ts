import { AxiosInstance } from "axios";
import { axiosInstance } from "./axiosInstance";

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

const getAllUser = async (accessToken: string, axiosJWT: AxiosInstance) => {
  try {
    const res = await axiosJWT.get("/users", {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    // console.log(res.data);
    return res.data;
  } catch (error) {
    console.log(error);
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

export { loginUser, registerUser, getAllUser, logOut, refreshToken };
