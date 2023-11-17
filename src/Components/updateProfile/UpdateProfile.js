import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateProfile } from "../../redux/slice/appConfig";
import "./UpdateProfile.scss";
function UpdateProfile() {
  const userProfile = useSelector((state) => state.appConfigReducer.myProfile);
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [userImg, setUserImg] = useState("");
  const dispatch = useDispatch();
  useEffect(() => {
    setName(userProfile?.name||"");
    setBio(userProfile?.bio||"");
    setUserImg(userProfile?.avatar?.url || "");
  }, [userProfile]);
  //function to handle User's input image
  function handleInputImage(e) {
    //fileReader to read file and allow to show on profile pic as well
    const file = e.target.files[0];
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = () => {
      if (fileReader.readyState === fileReader.DONE)
        setUserImg(fileReader.result);
    };
  }
  // function to handleSubmit
  function handleSubmit(event) {
    event.preventDefault();
    dispatch(
      updateProfile(
        //pass the data in the body for updateProfile slice :: async thunk
        {
          name,
          bio,
          userImg,
        }
      )
    );
  }
  return (
    <div className="updateProfile">
      <div className="container">
        <div className="left-part">
          <div className="input-user-img">
            <label htmlFor="image" className="labelImage">
              <img src={userImg} alt={name} />
            </label>
            <input
              type="file"
              id="image"
              className="inputImage"
              accept="image/*"
              onChange={handleInputImage}
            />
          </div>
        </div>
        <div className="right-part">
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              value={name}
              placeholder="Your name"
              onChange={(event) => setName(event.target.value)}
              className="input"
            />
            <textarea
              className="input"
              value={bio}
              onChange={(event) => setBio(event.target.value)}
              placeholder="Your bio"
            ></textarea>
            <input
              type="submit"
              className="btn btn-primary"
              onClick={handleSubmit}
            />
          </form>
          <button className="btn btn-secondary">Delete Account</button>
        </div>
      </div>
    </div>
  );
}

export default UpdateProfile;
