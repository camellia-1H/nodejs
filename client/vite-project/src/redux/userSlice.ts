import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "users",
  initialState: {
    users: {
      allUser: null,
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
