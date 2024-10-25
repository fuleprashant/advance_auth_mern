import {
  authFailure,
  authRequest,
  authSuccess,
  logoutSuccess,
  verifyOtpSuccess,
} from "../redux/authSlice";
import { store } from "../redux/store";
import axios from "axios";
import axiosInstance from "./url.service";
const dispatch = store.dispatch;

// signup api calling
export const signUpUser = async (userData) => {
  dispatch(authRequest);
  try {
    const response = await axiosInstance.post("/user/signup", userData);
    console.log("the rseponse is", response);
    dispatch(authSuccess(response.data.data));
    return response.data;
  } catch (error) {
    dispatch(authFailure(error));
    throw error.response.data;
  }
};

//login user
export const signInUser = async (userData) => {
  dispatch(authRequest);
  try {
    const response = await axiosInstance.post("/user/login", userData);
    dispatch(authSuccess(response.data.data));
    return response.data;
  } catch (error) {
    dispatch(authFailure(error));
    throw error.response.data;
  }
};

//otp otpVerify  api calling

export const otpVerify = async (userData) => {
  dispatch(authRequest);
  try {
    const response = await axiosInstance.post("/user/verify-otp", userData);
    dispatch(verifyOtpSuccess());
    return response.data;
  } catch (error) {
    dispatch(authFailure(error));
    throw error.response.data;
  }
};

// forgot-password fucntion

export const forgotPassword = async (userData) => {
  dispatch(authRequest);
  try {
    const response = await axiosInstance.post(
      "/user/forgot-password",
      userData
    );
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

// reset-password

export const resetPassword = async (userData) => {
  dispatch(authRequest);
  try {
    const response = await axiosInstance.post("/user/reset-password", userData);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

// user-logout

export const logoutUser = async () => {
  try {
    const response = await axiosInstance.get("/user/logout");
    console.log("the logout res", response);
    if (response.status === 200) {
      dispatch(logoutSuccess());
    }
    return response;
  } catch (error) {
    console.log(error);
  }
};
