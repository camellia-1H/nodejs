import { axiosInstance } from "./axiosInstance";

const login = async (email: string, password: string) => {
  try {
    const res = await axiosInstance.post("/users/login", {
      email,
      password,
    });
    // console.log(res.data);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

const register = async (
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

const getAllUser = async (accessToken: string) => {
  try {
    const res = await axiosInstance.get("/users", {
      headers: { accessToken: `Bearer ${accessToken}` },
    });
    // console.log(res.data);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export { login, register, getAllUser };
