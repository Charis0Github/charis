import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

//BASE URL
const BASE_URL = "https://motionless-pig-top-hat.cyclic.app/api/v1";

//INITIAL STATE FOR THE AUTH
const initialState = {
  allUserPayment: null,
  allUserPaymentError: false,
  allUserPaymentSuccess: false,
  allUserPaymentLoading: false,
  allUserPaymentMessage: "",
};

export const getAllPayment = createAsyncThunk(
  "allUserPayment/fetch",
  async (thunkAPI) => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.get(BASE_URL + `/payment/users/all`, {
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

const allUserPaymentSlice = createSlice({
  name: "allUserPayment",
  initialState,
  reducers: {
    resetAllUserPayment: (state) => {
      state.allUserPaymentError = false;
      state.allUserPaymentLoading = false;
      state.allUserPaymentSuccess = false;
      state.allUserPaymentMessage = "";
    },

    logOutAllUserPayment: (state) => {
      state.allUserPayment = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllPayment.pending, (state) => {
        state.allUserPaymentLoading = true;
      })
      .addCase(getAllPayment.fulfilled, (state, action) => {
        state.allUserPaymentLoading = false;
        state.allUserPaymentSuccess = true;
        state.allUserPaymentError = false;
        state.allUserPayment = action.payload;
      })
      .addCase(getAllPayment.rejected, (state, action) => {
        state.allUserPaymentLoading = false;
        state.allUserPaymentError = true;
        state.allUserPaymentSuccess = false;
        state.allUserPaymentMessage = action.payload;
      });
  },
});

export const { resetAllUserPayment } = allUserPaymentSlice.actions;
export default allUserPaymentSlice.reducer;
