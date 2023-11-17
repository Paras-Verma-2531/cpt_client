import React from "react";
import "./Avatar.scss";
import avatar from "../../assets/user.png";
function Avatar({ src }) {
  return (
    <div className="avatar">
      <img src={src ? src : avatar} alt="user-avatar" />
    </div>
  );
}

export default Avatar;
