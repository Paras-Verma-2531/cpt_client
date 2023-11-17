import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Outlet } from "react-router-dom";
import Navbar from "../../Components/navbar/Navbar";
import { getMyProfile } from "../../redux/slice/appConfig";
function Home() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getMyProfile());//whenever user loads the home page::load his profile
  }, []);
  return (
    <>
      <Navbar />
      {/* either the feed or profile will appear bottom the navbar */}
      <Outlet />
    </>
  );
}
export default Home;
