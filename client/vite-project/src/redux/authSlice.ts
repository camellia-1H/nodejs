import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    login: {
      currentUser: null,
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
  },
});

export const { loginSuccess, loginFailed, registerSuccess, registerFailed } =
  authSlice.actions;
export default authSlice;
