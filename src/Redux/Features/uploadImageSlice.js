import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

//BASE URL
const BASE_URL = "https://motionless-pig-top-hat.cyclic.app/api/v1";

const initialState = {
  imageUploadLoading: false,
  imageUploadSuccess: false,
  imageUploadError: false,
  imageUploadMessage: "",
};

export const imageUpload = createAsyncThunk(
  "uploadImage/update",
  async (reqBody, thunkAPI) => {
    const token = localStorage.getItem("token");
    // const id = localStorage.getItem("uid");
    try {
      const response = await axios.patch(
        BASE_URL + `/users/image/upload`,
        reqBody,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "content-type": "multipart/form-data",
          },
        }
      );
      console.log(JSON.stringify(response.data));
      return "Image uploaded successfully.";
    } catch (error) {
      if (error.response) {
        const obj = error.response.data;
        const objKey = Object.keys(obj)[0];
        let err = obj[objKey];
        console.log(err);
        return thunkAPI.rejectWithValue(err);
      } else if (error.request) {
        return thunkAPI.rejectWithValue("something went terribly wrong");
      } else {
        const obj = error.response.data;
        const objKey = Object.keys(obj)[0];
        let err = obj[objKey];
        return thunkAPI.rejectWithValue(err);
      }
    }
  }
);

const uploadImageSlice = createSlice({
  name: "uploadImage",
  initialState,
  reducers: {
    resetImageUpload: (state) => {
      state.imageUploadLoading = false;
      state.imageUploadSuccess = false;
      state.imageUploadError = false;
      state.imageUploadMessage = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(imageUpload.pending, (state) => {
        state.imageUploadLoading = true;
      })
      .addCase(imageUpload.fulfilled, (state, action) => {
        state.imageUploadLoading = false;
        state.imageUploadSuccess = true;
        state.imageUploadError = false;
        state.imageUploadMessage = action.payload;
      })
      .addCase(imageUpload.rejected, (state, action) => {
        state.imageUploadLoading = false;
        state.imageUploadSuccess = false;
        state.imageUploadError = true;
        state.imageUploadMessage = action.payload;
      });
  },
});

export const { resetImageUpload } = uploadImageSlice.actions;
export default uploadImageSlice.reducer;
