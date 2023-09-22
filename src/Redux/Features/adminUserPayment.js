import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

//BASE URL
const BASE_URL = "https://motionless-pig-top-hat.cyclic.app/api/v1";

//INITIAL STATE FOR THE AUTH
const initialState = {
  adminUserPayment: null,
  adminUserPaymentError: false,
  adminUserPaymentSuccess: false,
  adminUserPaymentLoading: false,
  adminUserPaymentMessage: "",
};

export const getAdminUserPayment = createAsyncThunk(
  "adminUserPayment/fetch",
  async (id, thunkAPI) => {
    const token = localStorage.getItem("token");
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

const adminUserPaymentSlice = createSlice({
  name: "adminUserPayment",
  initialState,
  reducers: {
    resetAdminUserPayment: (state) => {
      state.adminUserPaymentError = false;
      state.adminUserPaymentLoading = false;
      state.adminUserPaymentSuccess = false;
      state.adminUserPaymentMessage = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAdminUserPayment.pending, (state) => {
        state.adminUserPaymentLoading = true;
      })
      .addCase(getAdminUserPayment.fulfilled, (state, action) => {
        state.adminUserPaymentLoading = false;
        state.adminUserPaymentSuccess = true;
        state.adminUserPaymentError = false;
        state.adminUserPayment = action.payload;
      })
      .addCase(getAdminUserPayment.rejected, (state, action) => {
        state.adminUserPaymentLoading = false;
        state.adminUserPaymentError = true;
        state.adminUserPaymentSuccess = false;
        state.adminUserPaymentMessage = action.payload;
      });
  },
});

export const { resetAdminUserPayment } = adminUserPaymentSlice.actions;
export default adminUserPaymentSlice.reducer;
