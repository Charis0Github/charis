import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

//BASE URL
const BASE_URL = "https://api.calgi.org/api/v1";

const initialState = {
  investmentData: null,
  calculateInvestmentLoading: false,
  calculateInvestmentSuccess: false,
  calculateInvestmentError: false,
  calculateInvestmentMessage: "",
};

export const getROI = createAsyncThunk(
  "calculateInvestment/fetch",
  async (body, thunkAPI) => {
    const token = localStorage.getItem("token");
    // console.log(token);
    try {
      const response = await axios.post(
        BASE_URL + `/users/dashboard/shareCapital/roi`,
        body,
        {
          headers: { Authorization: "Bearer " + token },
        }
      );
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

const calculateInvestmentSlice = createSlice({
  name: "calculateInvestment",
  initialState,
  reducers: {
    resetCalculateInvestment: (state) => {
      state.calculateInvestmentLoading = false;
      state.calculateInvestmentSuccess = false;
      state.calculateInvestmentError = false;
      state.calculateInvestmentMessage = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getROI.pending, (state) => {
        state.calculateInvestmentLoading = true;
      })
      .addCase(getROI.fulfilled, (state, action) => {
        state.calculateInvestmentLoading = false;
        state.calculateInvestmentSuccess = true;
        state.calculateInvestmentError = false;
        state.investmentData = action.payload;
      })
      .addCase(getROI.rejected, (state, action) => {
        state.calculateInvestmentLoading = false;
        state.calculateInvestmentSuccess = false;
        state.calculateInvestmentError = true;
        state.calculateInvestmentMessage = action.payload;
      });
  },
});

export const { resetCalculateInvestment } = calculateInvestmentSlice.actions;
export default calculateInvestmentSlice.reducer;
