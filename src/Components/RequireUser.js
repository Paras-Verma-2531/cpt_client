import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { KEY_ACCESS_TOKEN, getItem } from "../Utils/localStorageManager";
function RequireUser() {
  //if accesstoken present :: navigate to home else login
  const accessToken = getItem(KEY_ACCESS_TOKEN);
  return accessToken ? <Outlet /> : <Navigate to="/login" />;
}

export default RequireUser;
