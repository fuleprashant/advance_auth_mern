import { createSlice } from "@reduxjs/toolkit";
import Cookies from "universal-cookie";

const cookie = new Cookies();
const token = cookie.get("jwttoken");

const initialState = {
  user: null,
  isAuthenticate: !!token, // here it pretend a boolean value like if the token is there then its return boolean value true and if token is not there it return false
  loading: false,
  isVerified: false,
  error: null,
};
// now we create  a slice for the authSlice.js and for that code is below

const authSlice = createSlice({
  name: "auth", // here we define name first to see that in redux store
  initialState,
  reducers: {
    authRequest(state) {
      state.loading = true;
      state.error = null;
    },
    authSuccess(state, action) {
      const user = action.payload;
      state.user = user;
      state.isAuthenticate = true;
      state.isVerified = user.isVerified;
      state.error = null;
    },
    verifyOtpSuccess(state) {
      state.isVerified = true;
      if (state.user) {
        state.user.isVerified = true;
      }
    },
    authFailure(state, action) {
      state.error = action.payload;
      state.loading = false;
    },
    logoutSuccess(state, action) {
      state.user = null;
      state.isAuthenticate = false;
    },
  },
});

export const {
  authFailure,
  authRequest,
  authSuccess,
  verifyOtpSuccess,
  logoutSuccess,
} = authSlice.actions;

export default authSlice.reducer;
