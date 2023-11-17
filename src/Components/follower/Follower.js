import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { followOrUnfollow } from "../../redux/slice/feedSlice";
import Avatar from "../avatar/Avatar";
import "./Follower.scss";
function Follower({ user }) {
  const feedData = useSelector((store) => store.feedReducer.feedData);
  const [isFollowing, setIsFollowing] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    setIsFollowing(feedData?.followings?.find((item) => item._id === user._id));
  }, [feedData]);
  //function to handle User follow/unfollow
  function handleUserFollow() {
    dispatch(
      followOrUnfollow({
        userIdToFollow: user._id,
      })
    );
  }
  return (
    // curr user should not be visible in suggestions section
    feedData?._id !== user._id && (
      <div className="follower">
        <div
          className="user-info"
          onClick={() => navigate(`/profile/${user._id}`)}
        >
          <Avatar src={user?.avatar?.url} />
          <h4 className="name">{user?.name}</h4>
        </div>
        <h5
          className={isFollowing ? "hover-link follow-link" : "btn btn-primary"}
          onClick={handleUserFollow}
        >
          {isFollowing ? "unfollow" : "follow"}
        </h5>
      </div>
    )
  );
}

export default Follower;
