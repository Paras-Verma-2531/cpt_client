import { configureStore } from "@reduxjs/toolkit";
import appConfigReducer from "./slice/appConfig";
import postReducer from "./slice/postsSlice";
import feedReducer from "./slice/feedSlice";
export default configureStore({
  reducer: { appConfigReducer, postReducer, feedReducer },
});
