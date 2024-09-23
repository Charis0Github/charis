import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

//BASE URL
const BASE_URL = "https://api.calgi.org/api/v1";

const initialState = {
  paymentStatus: "",
  paymentLoading: false,
  paymentSuccess: false,
  paymentError: false,
  paymentMessage: "",

  verifyStatus: null,
  verifyLoading: false,
  verifySuccess: false,
  verifyError: false,
  verifyMessage: "",
};

export const createPaymentLink = createAsyncThunk(
  "payment/create",
  async (reqBody, thunkAPI) => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.post(BASE_URL + `/payment`, reqBody, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(JSON.stringify(response.data));
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

export const verifyPayment = createAsyncThunk(
  "payment/verify",
  async (reqBody, thunkAPI) => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.post(BASE_URL + `/payment/verify`, reqBody, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.status === 200) {
        return response.data;
      }
      console.log(JSON.stringify("Verified Payment" + response.data));
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

const paymentSlice = createSlice({
  name: "payment",
  initialState,
  reducers: {
    resetPayment: (state) => {
      state.paymentStatus = "";
    },

    resetPaymentMini: (state) => {
      state.paymentLoading = false;
      state.paymentSuccess = false;
      state.paymentError = false;
      state.paymentMessage = "";
    },

    resetVerifyPayment: (state) => {
      state.verifyStatus = null;
      state.verifyLoading = false;
      state.verifySuccess = false;
      state.verifyError = false;
      state.verifyMessage = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createPaymentLink.pending, (state) => {
        state.paymentLoading = true;
      })
      .addCase(createPaymentLink.fulfilled, (state, action) => {
        state.paymentLoading = false;
        state.paymentSuccess = true;
        state.paymentError = false;
        state.paymentStatus = action.payload;
      })
      .addCase(createPaymentLink.rejected, (state, action) => {
        state.paymentLoading = false;
        state.paymentSuccess = false;
        state.paymentError = true;
        state.paymentMessage = action.payload;
      })

      .addCase(verifyPayment.pending, (state) => {
        state.verifyLoading = true;
      })
      .addCase(verifyPayment.fulfilled, (state, action) => {
        state.verifyLoading = false;
        state.verifySuccess = true;
        state.verifyError = false;
        state.verifyStatus = action.payload;
      })
      .addCase(verifyPayment.rejected, (state, action) => {
        state.verifyLoading = false;
        state.verifySuccess = false;
        state.verifyError = true;
        state.verifyMessage = action.payload;
      });
  },
});

export const { resetPayment, resetPaymentMini, resetVerifyPayment } =
  paymentSlice.actions;
export default paymentSlice.reducer;
