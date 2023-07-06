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

const getAllUser = async (accessToken: string) => {
  try {
    const res = await axiosInstance.get("/users", {
      headers: { token: `Bearer ${accessToken}` },
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
      headers: { token: `Bearer ${accessToken}` },
    });
  } catch (error) {
    console.log(error);
  }
};

export { loginUser, registerUser, getAllUser, logOut };
