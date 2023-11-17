import { axiosClient } from "../../Utils/axiosClient";
import { setLoading } from "./appConfig";
import { likesAndDislike } from "./postsSlice";
const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");
//getUserProfile async thunk
export const getFeedData = createAsyncThunk(
  "user/getFeedData",
  async (_, thunkAPI) => {
    try {
      //loading bar
      thunkAPI.dispatch(setLoading(true));
      //here result is coming from interceptor thus == actualResponse.data where actualResponse contains [config,data,..]
      const result = await axiosClient.get("/user/getFeedData");
      console.log(result.response);
      return result.response; //data is returned to extraReducers
    } catch (error) {
      return Promise.reject(error);
    } finally {
      thunkAPI.dispatch(setLoading(false));
    }
  }
);
//follow or Unfollow thunk
export const followOrUnfollow = createAsyncThunk(
  "user/followOrUnfollow",
  async (body, thunkAPI) => {
    try {
      thunkAPI.dispatch(setLoading(true));
      const result = await axiosClient.post("/user/follow", body);
      return result.response.user;
    } catch (error) {
      return Promise.reject(error);
    } finally {
      thunkAPI.dispatch(setLoading(false));
    }
  }
);
const feedSlice = createSlice({
  name: "feedSlice",
  initialState: {
    feedData: {},
  },
  extraReducers: (builder) => {
    builder
      .addCase(getFeedData.fulfilled, (state, action) => {
        state.feedData = action.payload;
      })
      // to handle like of feed data
      .addCase(likesAndDislike.fulfilled, (state, action) => {
        const post = action.payload;
        const index = state?.feedData?.posts?.findIndex(
          (item) => item._id === post._id
        );
        if (index !== undefined && index !== -1) {
          state.feedData.posts[index] = post;
        }
      })
      .addCase(followOrUnfollow.fulfilled, (state, action) => {
        const user = action.payload;
        const index = state?.feedData?.followings?.findIndex(
          (item) => item._id === user._id
        );
        //if user was present in the followings list :: remove him
        if (index !== -1) {
          state.feedData.followings.splice(index, 1);
          state.feedData.suggestions.push(user);
          //then add him to the suggestions list:
        } else {
          const suggIndex = state?.feedData?.suggestions?.findIndex(
            (item) => item._id === user._id
          );
          state.feedData.followings.push(user);
          state.feedData.suggestions.splice(suggIndex, 1);
        }
      });
  },
});
export default feedSlice.reducer;
