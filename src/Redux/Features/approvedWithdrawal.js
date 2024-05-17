import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

//BASE URL
const BASE_URL = "https://api.calgi.org/api/v1";

const initialState = {
  approvedWithdrawal: null,
  approvedWithdrawalLoading: false,
  approvingWithdrawalLoading: false,
  approvedWithdrawalSuccess: false,
  approvedWithdrawalError: false,
  approvedWithdrawalMessage: "",
};

export const approveWithdrawal = createAsyncThunk(
  "approvedWithdrawal/update",
  async (id, thunkAPI) => {
    const token = localStorage.getItem("token");
    const body = { withdrawalStatus: "approved" };
    try {
      const response = await axios.patch(
        BASE_URL + `/users/dashboard/withdrawal/${id}`,
        body,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      //   console.log(JSON.stringify(response.data));
      return response.data.msg;
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
    resetApprovedWithdrawal: (state) => {
      state.approvedWithdrawalLoading = false;
      state.approvingWithdrawalLoading = false;
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
      })

      .addCase(approveWithdrawal.pending, (state) => {
        state.approvingWithdrawalLoading = true;
      })
      .addCase(approveWithdrawal.fulfilled, (state, action) => {
        state.approvedWithdrawalLoading = false;
        state.approvedWithdrawalSuccess = true;
        state.approvedWithdrawalError = false;
        state.approvedWithdrawalMessage = action.payload;
      })
      .addCase(approveWithdrawal.rejected, (state, action) => {
        state.approvedWithdrawalLoading = false;
        state.approvedWithdrawalSuccess = false;
        state.approvedWithdrawalError = true;
        state.approvedWithdrawalMessage = action.payload;
      });
  },
});

export const { resetApprovedWithdrawal } = approvedWithdrawalSlice.actions;
export default approvedWithdrawalSlice.reducer;
