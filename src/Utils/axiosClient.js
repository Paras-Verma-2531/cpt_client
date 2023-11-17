import axios from "axios";
import {
  getItem,
  KEY_ACCESS_TOKEN,
  removeItem,
  setItem,
} from "./localStorageManager";
import store from "../redux/store";
import { showToast } from "../redux/slice/appConfig";
import { TOAST_FAILURE, TOAST_SUCCESS } from "../App";
// axios is better than fetch to call API's because of intercepters
export const axiosClient = axios.create({
  baseURL: process.env.REACT_APP_SERVER_BASE_URL,
  withCredentials: true, // prevent sending cookie to the frontEnd from backend
});
// Interceptors can be defined as the layer just before the frontEnd which provide the smooth process for handeling errors:or other task such as adding Authentication headers
// In our case:: it handles 401 request::i,e to automatically generate the access token without informing frontEnd:
axiosClient.interceptors.request.use((request) => {
  const accessToken = getItem(KEY_ACCESS_TOKEN); //fetch the access token from localStorage
  //sets the access token in header of every subsequent request
  request.headers["Authorization"] = `Bearer ${accessToken}`;
  return request;
});
//response interceptors:
axiosClient.interceptors.response.use(
  async (response) => {
    const data = response.data; //fetch the data from axios response
    const status = data.status;
    if (status === "ok") return data; // if no error encountered:: return the data
    const { statusCode, message } = data;
    const OriginalRequest = response.config;
    store.dispatch(
      showToast({
        type: TOAST_FAILURE,
        message
      })
    );
    if (statusCode === 401 && !OriginalRequest._retry) {
      OriginalRequest._retry = true; //prevent from infinite loop
      // Access token is experied
      const newResponse = await axios
        .create({
          baseURL: process.env.REACT_APP_SERVER_BASE_URL,
          withCredentials: true, //means passing cookie in the request
        })
        .get("/auth/refresh"); // silently call the refresh API to generate new accessToken
      if (newResponse.data.status === "ok") {
        // status ok means :: refreshToken is verfied & is active
        setItem(KEY_ACCESS_TOKEN, newResponse.data.response.newAccessToken); //set the new AccessToken in local Storage
        OriginalRequest.headers[
          "Authorization"
        ] = `Bearer ${newResponse.data.response.newAccessToken}`;
        return axios(OriginalRequest); // not axiosClient because it will use it's Authorization header
      } else {
        //Refresh token is also expired: thus user need to re-login
        // delete it's access token from localStorage
        removeItem(KEY_ACCESS_TOKEN);
        window.location.replace("/login", "_self");
        return Promise.reject(message);
      }
    }
    return Promise.reject(message); //if some other error::  return with the error
  },
  async (error) => {
    store.dispatch(
      showToast({
        type: TOAST_FAILURE,
        message: error.message,
      })
    );
    return Promise.reject(error);
  }
);
