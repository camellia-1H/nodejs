import { createSlice } from "@reduxjs/toolkit";
import { User } from "../types/User";

const userSlice = createSlice({
  name: "users",
  initialState: {
    users: {
      allUser: <User[]>[],
      error: false,
    },
    msg: "",
  },
  reducers: {
    getAllUserSuccess: (state, action) => {
      state.users.allUser = action.payload;
    },
    getAllUserFailed: (state) => {
      state.users.error = true;
    },
    deleteUserSuccess: (state, action) => {
      state.msg = action.payload;
    },
    deleteUserFailed: (state, action) => {
      state.msg = action.payload;
    },
  },
});

export const {
  getAllUserSuccess,
  getAllUserFailed,
  deleteUserSuccess,
  deleteUserFailed,
} = userSlice.actions;

export default userSlice;
