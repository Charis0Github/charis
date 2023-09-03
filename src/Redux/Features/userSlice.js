import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

//BASE URL
const BASE_URL = "https://motionless-pig-top-hat.cyclic.app/api/v1";

//INITIAL STATE FOR THE AUTH
const initialState = {
  allUsers: [],
  usersError: false,
  usersSuccess: false,
  usersLoading: false,
  usersMessage: "",
};

export const getUsers = createAsyncThunk("allUsers/fetch", async (thunkAPI) => {
  const token = localStorage.getItem("token");
  try {
    const response = await axios.get(BASE_URL + "/users", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.status === 200) {
      return response.data.user;
    }
  } catch (error) {
    if (error.response) {
      const obj = error.response.data;
      const objKey = Object.keys(obj)[0];
      let err = obj[objKey];
      // console.log(err)
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
});

export const userSlice = createSlice({
  name: "allUsers",
  initialState,
  // RESET STATE ACTION
  reducers: {
    usersReset: (state) => {
      state.usersError = false;
      state.usersLoading = false;
      state.usersSuccess = false;
      state.usersMessage = "";
    },
    userLogout: (state) => {
      state.allUsers = [];
    },
  },
  extraReducers: (builder) => {
    builder
      // GET ALL USERS HANDLER
      .addCase(getUsers.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getUsers.fulfilled, (state, action) => {
        state.usersLoading = false;
        state.usersError = false;
        state.usersSuccess = true;
        state.allUsers = action.payload;
      })
      .addCase(getUsers.rejected, (state, action) => {
        state.usersLoading = false;
        state.usersError = true;
        state.usersMessage = action.payload;
        state.allUsers = [];
      });
  },
});

export const { usersReset } = userSlice.actions;
export default userSlice.reducer;
