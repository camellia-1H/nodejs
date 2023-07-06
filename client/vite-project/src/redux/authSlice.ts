import { createSlice } from "@reduxjs/toolkit";
type User = {
  data: {
    name: string;
    email: string;
    password?: string;
    phoneNumber: string;
    accessToken: string;
  };
};

const authSlice = createSlice({
  name: "auth",
  initialState: {
    login: {
      currentUser: <User>{},
      error: false,
    },
    register: {
      success: false,
      error: false,
    },
  },
  reducers: {
    loginSuccess: (state, action) => {
      state.login.currentUser = action.payload;
    },
    loginFailed: (state) => {
      state.login.error = true;
    },
    registerSuccess: (state) => {
      state.register.success = true;
    },
    registerFailed: (state) => {
      state.register.error = true;
    },
    logOutSuccess: (state) => {
      state.login.currentUser = <User>{};
    },
    logOutFailed: (state) => {
      state.login.error = false;
    },
  },
});

export const {
  loginSuccess,
  loginFailed,
  registerSuccess,
  registerFailed,
  logOutSuccess,
  logOutFailed,
} = authSlice.actions;
export default authSlice;
