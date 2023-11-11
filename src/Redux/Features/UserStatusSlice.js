import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

//BASE URL
const BASE_URL = "https://motionless-pig-top-hat.cyclic.app/api/v1";

const initialState = {
  usersStatus: null,
  usersStatusLoading: false,
  usersStatusSuccess: false,
  usersStatusError: false,
  usersStatusMessage: "",
};

export const getUsersStatus = createAsyncThunk(
  "usersStatus/fetch",
  async (thunkAPI) => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.get(BASE_URL + `/users/status/both`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
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

const usersStatusSlice = createSlice({
  name: "usersStatus",
  initialState,
  reducers: {
    resetUsersStatus: (state) => {
      state.usersStatusLoading = false;
      state.usersStatusSuccess = false;
      state.usersStatusError = false;
      state.usersStatusMessage = "";
    },

    logOutUsersStat: (state) => {
      state.usersStatus = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUsersStatus.pending, (state) => {
        state.calculateShareLoading = true;
      })
      .addCase(getUsersStatus.fulfilled, (state, action) => {
        state.usersStatusLoading = false;
        state.usersStatusSuccess = true;
        state.usersStatusError = false;
        state.usersStatus = action.payload;
      })
      .addCase(getUsersStatus.rejected, (state, action) => {
        state.usersStatusLoading = false;
        state.usersStatusSuccess = false;
        state.usersStatusError = true;
        state.usersStatusMessage = action.payload;
      });
  },
});

export const { resetUsersStatus, logOutUsersStat } = usersStatusSlice.actions;
export default usersStatusSlice.reducer;
