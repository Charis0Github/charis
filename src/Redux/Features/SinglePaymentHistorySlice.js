import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

//BASE URL
const BASE_URL = "https://api.calgi.org/api/v1";

//INITIAL STATE FOR THE AUTH
const initialState = {
  singlePaymentHistory: null,
  singlePaymentError: false,
  singlePaymentSuccess: false,
  singlePaymentLoading: false,
  singlePaymentMessage: "",
};

export const getSinglePayment = createAsyncThunk(
  "singlePaymentHistory/fetch",
  async (thunkAPI) => {
    const token = localStorage.getItem("token");
    const id = localStorage.getItem("uid");
    try {
      const response = await axios.get(BASE_URL + `/payment/${id}`, {
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

const singlePaymentHistorySlice = createSlice({
  name: "singlePaymentHistory",
  initialState,
  reducers: {
    resetSinglePayment: (state) => {
      state.singlePaymentError = false;
      state.singlePaymentLoading = false;
      state.singlePaymentSuccess = false;
      state.singlePaymentMessage = "";
    },

    resetSingularPayment: (state) => {
      state.singlePaymentHistory = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getSinglePayment.pending, (state) => {
        state.singlePaymentLoading = true;
      })
      .addCase(getSinglePayment.fulfilled, (state, action) => {
        state.singlePaymentLoading = false;
        state.singlePaymentSuccess = true;
        state.singlePaymentError = false;
        state.singlePaymentHistory = action.payload;
      })
      .addCase(getSinglePayment.rejected, (state, action) => {
        state.singlePaymentLoading = false;
        state.singlePaymentError = true;
        state.singlePaymentSuccess = false;
        state.singlePaymentMessage = action.payload;
      });
  },
});

export const { resetSinglePayment, resetSingularPayment } =
  singlePaymentHistorySlice.actions;
export default singlePaymentHistorySlice.reducer;
