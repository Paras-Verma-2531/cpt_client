import axios from "axios";
export const axiosClient = axios.create({
  baseURL: process.env.REACT_APP_SERVER_BASE_URL,
  withCredentials: true, // prevent sending cookie to the frontEnd from backend
});
