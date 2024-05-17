import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

//BASE URL
const BASE_URL = "https://api.calgi.org/api/v1";

//INITIAL STATE FOR THE AUTH
const initialState = {
  userWithdrawal: null,
  userWithdrawalError: false,
  userWithdrawalSuccess: false,
  userWithdrawalLoading: false,
  userWithdrawalMessage: "",
};

export const getUserWithdrawal = createAsyncThunk(
  "userWithdrawal/fetch",
  async (thunkAPI) => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.get(BASE_URL + `/users/withdrawal/mine`, {
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
  }
);

const userWithdrawalSlice = createSlice({
  name: "userWithdrawal",
  initialState,
  reducers: {
    resetUserWithdrawal: (state) => {
      state.userWithdrawalError = false;
      state.userWithdrawalLoading = false;
      state.userWithdrawalSuccess = false;
      state.userWithdrawalMessage = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUserWithdrawal.pending, (state) => {
        state.userWithdrawalLoading = true;
      })
      .addCase(getUserWithdrawal.fulfilled, (state, action) => {
        state.userWithdrawalLoading = false;
        state.userWithdrawalSuccess = true;
        state.userWithdrawalError = false;
        state.userWithdrawal = action.payload;
      })
      .addCase(getUserWithdrawal.rejected, (state, action) => {
        state.userWithdrawalLoading = false;
        state.userWithdrawalSuccess = false;
        state.userWithdrawalError = true;
        state.userWithdrawalMessage = action.payload;
      });
  },
});

export const { resetUserWithdrawal } = userWithdrawalSlice.actions;
export default userWithdrawalSlice.reducer;
