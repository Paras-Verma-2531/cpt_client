import React from "react";
import Avatar from "../avatar/Avatar";
import { useNavigate } from "react-router-dom";
import { AiOutlineLogout } from "react-icons/ai";
import "./Navbar.scss";
import { useDispatch, useSelector } from "react-redux";
import { axiosClient } from "../../Utils/axiosClient";
import { setLoading } from "../../redux/slice/appConfig";
import { KEY_ACCESS_TOKEN, removeItem } from "../../Utils/localStorageManager";
function Navbar() {
  const userProfile = useSelector((state) => state.appConfigReducer.myProfile);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  //function to handleLogout
  function handleLogOut() {
    try {
      dispatch(setLoading(true));
      axiosClient.get("/auth/logout");
      removeItem(KEY_ACCESS_TOKEN);
      dispatch(setLoading(false));
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div className="navbar">
      <div className="container">
        {/* whenever user clicks on banner --> redirect to home page */}
        <h2 className="left-banner hover-link" onClick={() => navigate("/")}>
          Social Media
        </h2>
        <div className="right-side">
          <div
            className="profile hover-link"
            onClick={() => navigate(`/profile/${userProfile?._id}`)}
          >
            <Avatar src={userProfile?.avatar?.url} />
          </div>
          <div className="logout hover-link" onClick={handleLogOut}>
            <AiOutlineLogout />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
