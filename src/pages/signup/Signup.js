import React, { useState } from "react";
import { Link } from "react-router-dom";
import { axiosClient } from "../../utils/axiosClient";
import "./Signup.scss";
function Signup() {
  //fetch the data::
  const [userEmail, setUserEmail] = useState("");
  const [userName, setUserName] = useState("");
  const [userPassword, setUserPassword] = useState("");
  //function to handle Data on submit
  async function handleSubmit(event) {
    event.preventDefault(); //prevent the default behaviour of form
    try {
      const result = await axiosClient.post(
        "/auth/signup",
        //send the data in the body of API
        {
          email: userEmail,
          name: userName,
          password: userPassword,
        }
      );
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div className="Signup">
      <div className="signup-box">
        <h2 className="signup-heading">Signup</h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            className="signup-input"
            onChange={(event) => setUserName(event.target.value)}
          />
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            className="signup-input"
            onChange={(event) => setUserEmail(event.target.value)}
          />
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            className="signup-input"
            onChange={(event) => setUserPassword(event.target.value)}
          />
          <input type="submit" className="signup-submit" />
        </form>
        <p className="login-Navigate">
          Already have an Account?
          <span>
            <Link className="link" to="/login">
              Login
            </Link>
          </span>
        </p>
      </div>
    </div>
  );
}

export default Signup;
