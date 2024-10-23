import axios from "axios";

const api = process.env.API_URL;

const axiosInstance = axios.create({
  baseURL: api,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosInstance;
