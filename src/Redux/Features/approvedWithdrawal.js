import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

//BASE URL
const BASE_URL = "https://motionless-pig-top-hat.cyclic.app/api/v1";

const initialState = {
  approvedWithdrawal: null,
  approvedWithdrawalLoading: false,
  approvedWithdrawalSuccess: false,
  approvedWithdrawalError: false,
  approvedWithdrawalMessage: "",
};

export const getApprovedWithdrawal = createAsyncThunk(
  "approvedWithdrawal/get",
  async (thunkAPI) => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.get(
        BASE_URL + `/users/dashboard/withdrawal`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
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

const approvedWithdrawalSlice = createSlice({
  name: "approvedWithdrawal",
  initialState,
  reducers: {
    resetPendingWithdrawal: (state) => {
      state.approvedWithdrawalLoading = false;
      state.approvedWithdrawalSuccess = false;
      state.approvedWithdrawalError = false;
      state.approvedWithdrawalMessage = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getApprovedWithdrawal.pending, (state) => {
        state.approvedWithdrawalLoading = true;
      })
      .addCase(getApprovedWithdrawal.fulfilled, (state, action) => {
        state.approvedWithdrawalLoading = false;
        state.approvedWithdrawalSuccess = true;
        state.approvedWithdrawalError = false;
        state.approvedWithdrawal = action.payload;
      })
      .addCase(getApprovedWithdrawal.rejected, (state, action) => {
        state.approvedWithdrawalLoading = false;
        state.approvedWithdrawalSuccess = false;
        state.approvedWithdrawalError = true;
        state.approvedWithdrawalMessage = action.payload;
      });
  },
});

export const { resetApprovedWithdrawal } = approvedWithdrawalSlice.actions;
export default approvedWithdrawalSlice.reducer;
