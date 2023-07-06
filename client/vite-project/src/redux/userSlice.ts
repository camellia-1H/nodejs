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
  },
});

export const { getAllUserSuccess, getAllUserFailed } = userSlice.actions;

export default userSlice;
