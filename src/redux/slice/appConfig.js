import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosClient } from "../../Utils/axiosClient";
// Redux thunk to call getMyProfile API asyncronously
export const getMyProfile = createAsyncThunk(
  "user/getMyProfile",
  async (body, thunkAPI) => {
    try {
      //loading bar
      thunkAPI.dispatch(setLoading(true));
      //here result is coming from interceptor thus == actualResponse.data where actualResponse contains [config,data,..]
      const result = await axiosClient.get("/user/getMyProfile");
      return result.response;//data is returned to extraReducers
    } catch (error) {
      return Promise.reject(error);
    } finally {
      thunkAPI.dispatch(setLoading(false));
    }
  }
);
export const updateProfile = createAsyncThunk(
  "user/updateProfile",
  async (body, thunkAPI) => {
    try {
      thunkAPI.dispatch(setLoading(true));
      const result = await axiosClient.put("/user/", body);
      return result.response;
    } catch (error) {
      return Promise.reject(error);
    } finally {
      thunkAPI.dispatch(setLoading(false));
    }
  }
);
//Slice which consist the states :: isLoading,myProfile
const appConfigSlice = createSlice({
  name: "appConfigSlice",
  initialState: {
    isLoading: false, // for the loading bar
    myProfile: {},
    toastData:{}
  },
  reducers: {
    setLoading: (state, action) => {
      state.isLoading = action.payload;// to the set the isLoading state to true/false
    },
    showToast:(state,action)=>
    {
      state.toastData=action.payload;
    }
  },
  //only used when async thunk is present
  extraReducers: (builder) => {
    builder
      .addCase(getMyProfile.fulfilled, (state, action) => {
        state.myProfile = action.payload?.currUser;
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.myProfile = action.payload?.currUser;
      });
  },
});
export default appConfigSlice.reducer;
export const { setLoading,showToast } = appConfigSlice.actions;
