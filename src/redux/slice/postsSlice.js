import { axiosClient } from "../../Utils/axiosClient";
import { setLoading } from "./appConfig";
const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");
//getUserProfile async thunk
export const getUserProfile = createAsyncThunk(
  "user/getUserProfile",
  async (body, thunkAPI) => {
    try {
      //loading bar
      thunkAPI.dispatch(setLoading(true));
      //here result is coming from interceptor thus == actualResponse.data where actualResponse contains [config,data,..]
      const result = await axiosClient.post("/user/getUserProfile", body);
      return result.response; //data is returned to extraReducers
    } catch (error) {
      return Promise.reject(error);
    } finally {
      thunkAPI.dispatch(setLoading(false));
    }
  }
);
//likesAndDislike async thunk
export const likesAndDislike = createAsyncThunk(
  "post/likeAndDislike",
  async (body, thunkAPI) => {
    try {
      //loading bar
      thunkAPI.dispatch(setLoading(true));
      const result = await axiosClient.post("/post/like", body);
      return result.response;
    } catch (error) {
      return Promise.reject(error);
    } finally {
      thunkAPI.dispatch(setLoading(false));
    }
  }
);
//set the userProfile with it's actual data
const postSlice = createSlice({
  name: "postSlice",
  initialState: {
    userProfile: {},
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUserProfile.fulfilled, (state, action) => {
        state.userProfile = action.payload;
      })
      .addCase(likesAndDislike.fulfilled, (state, action) => {
        const post = action.payload;
        const index = state?.userProfile?.posts?.findIndex(
          (item) => item._id === post._id
        );
        if (index !== undefined && index !== -1) {
          state.userProfile.posts[index] = post;
        }
      });
  },
});
export default postSlice.reducer;
