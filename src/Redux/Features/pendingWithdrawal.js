import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

//BASE URL
const BASE_URL = "https://motionless-pig-top-hat.cyclic.app/api/v1";

const initialState = {
  pendingWithdrawal: null,
  pendingWithdrawalLoading: false,
  pendingWithdrawalSuccess: false,
  pendingWithdrawalError: false,
  pendingWithdrawalMessage: "",
};

export const getPendingWithdrawal = createAsyncThunk(
  "pendingWithdrawal/get",
  async (thunkAPI) => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.get(BASE_URL + `/users/withdrawal/pending`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      //   console.log(JSON.stringify(response.data));
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

const pendingWithdrawalSlice = createSlice({
  name: "pendingWithdrawal",
  initialState,
  reducers: {
    resetPendingWithdrawal: (state) => {
      state.pendingWithdrawalLoading = false;
      state.pendingWithdrawalSuccess = false;
      state.pendingWithdrawalError = false;
      state.pendingWithdrawalMessage = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getPendingWithdrawal.pending, (state) => {
        state.pendingWithdrawalLoading = true;
      })
      .addCase(getPendingWithdrawal.fulfilled, (state, action) => {
        state.pendingWithdrawalLoading = false;
        state.pendingWithdrawalSuccess = true;
        state.pendingWithdrawalError = false;
        state.pendingWithdrawal = action.payload;
      })
      .addCase(getPendingWithdrawal.rejected, (state, action) => {
        state.pendingWithdrawalLoading = false;
        state.pendingWithdrawalSuccess = false;
        state.pendingWithdrawalError = true;
        state.pendingWithdrawalMessage = action.payload;
      });
  },
});

export const { resetPendingWithdrawal } = pendingWithdrawalSlice.actions;
export default pendingWithdrawalSlice.reducer;
