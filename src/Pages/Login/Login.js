import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { axiosClient } from "../../Utils/axiosClient";
import {
  KEY_ACCESS_TOKEN,
  setItem,
  getItem,
} from "../../Utils/localStorageManager";
import "./Login.scss";
function Login() {
  //fetch the data::
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const navigate = useNavigate();
  //function to handle Data on submit
  async function handleSubmit(event) {
    event.preventDefault(); //prevent the default behaviour of form
    try {
      const result = await axiosClient.post(
        "/auth/login",
        //send the data in the body of API
        {
          email: userEmail,
          password: userPassword,
        }
      );
      setItem(KEY_ACCESS_TOKEN, result.response.accessToken); //save the access token to localStorage
      navigate("/"); // navigate to home page once,done with login
      //console.log(result);
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div className="Login">
      <div className="login-box">
        <h2 className="login-heading">Login</h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            className="login-input"
            onChange={(event) => setUserEmail(event.target.value)}
          />
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            className="login-input"
            onChange={(event) => setUserPassword(event.target.value)}
          />
          <input type="submit" className="login-submit" />
        </form>
        <p className="signup-Navigate">
          Create an Account?
          <span>
            <Link className="link" to="/signup">
              Signup
            </Link>
          </span>
        </p>
      </div>
    </div>
  );
}
export default Login;
