import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

//BASE URL
const BASE_URL = "https://api.calgi.org/api/v1";

const initialState = {
  requestPayLoading: false,
  requestPaySuccess: false,
  requestPayError: false,
  requestPayMessage: "",
};

export const requestPayment = createAsyncThunk(
  "requestPay",
  async (amount, thunkAPI) => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.post(
        BASE_URL + "/users/dashboard/withdrawal",
        amount,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      console.log(response.data);
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

const requestPaymentSlice = createSlice({
  name: "requestPay",
  initialState,
  reducers: {
    resetRequestPay: (state) => {
      state.requestPayLoading = false;
      state.requestPaySuccess = false;
      state.requestPayError = false;
      state.requestPayMessage = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(requestPayment.pending, (state) => {
        state.requestPayLoading = true;
      })
      .addCase(requestPayment.fulfilled, (state, action) => {
        state.requestPayLoading = false;
        state.requestPayError = false;
        state.requestPaySuccess = true;
        state.requestPayMessage = action.payload;
      })
      .addCase(requestPayment.rejected, (state, action) => {
        state.requestPayLoading = false;
        state.requestPayError = true;
        state.requestPaySuccess = false;
        state.requestPayMessage = action.payload;
      });
  },
});

export const { resetRequestPay } = requestPaymentSlice.actions;
export default requestPaymentSlice.reducer;
