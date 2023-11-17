import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getFeedData } from "../../redux/slice/feedSlice";
import Follower from "../follower/Follower";
import Post from "../post/Post";
import "./Feed.scss";

function Feed() {
  const feedData = useSelector((store) => store.feedReducer.feedData);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getFeedData());
  }, [dispatch]);

  return (
    <div className="feed">
      <div className="container">
        {/* left part shows multiple posts */}
        <div className="left-part">
          {feedData?.posts?.map((post) => (
            <Post key={post._id} post={post} />
          ))}
        </div>
        {/* right-part shows followings of current user */}
        <div className="right-part">
          <div className="following">
            <h3 className="title">You are following</h3>
            {feedData?.followings?.map((user) => (
              <Follower key={user._id} user={user} />
            ))}
          </div>
          <div className="suggestions">
            <h3 className="title">Suggested for you</h3>
            {feedData?.suggestions?.map((user) => (
              <Follower key={user._id} user={user} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
export default Feed;
