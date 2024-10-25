import axios from "axios";
// Access the API URL from the environment variable
const api = import.meta.env.VITE_API_URL;

console.log("API URL:", api); // This will log: http://localhost:4000

// Create an Axios instance using the base URL from the env variable
const axiosInstance = axios.create({
  baseURL: api, // VITE_API_URL will be used here
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosInstance;
