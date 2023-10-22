import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

//BASE URL
const BASE_URL = "https://motionless-pig-top-hat.cyclic.app/api/v1";

const initialState = {
  loanEligible: null,
  loanEligibleLoading: false,
  loanEligibleSuccess: false,
  loanEligibleError: false,
  loanEligibleMessage: "",
};

export const checkEligibility = createAsyncThunk(
  "eligibilityCheck/fetch",
  async (thunkAPI) => {
    const token = localStorage.getItem("token");
    // const id = localStorage.getItem("uid");
    try {
      const response = await axios.get(
        BASE_URL + `/users/loan/checkLoanEligibility`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(JSON.stringify(response.data));
      return response.data;
    } catch (error) {
      if (error.response) {
        const obj = error.response.data;
        const objKey = Object.keys(obj)[0];
        let err = obj[objKey];
        // console.log("THE LOAN ERROR" + err);
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

const eligibilitySlice = createSlice({
  name: "eligibilityCheck",
  initialState,
  reducers: {
    resetEigibility: (state) => {
      state.loanEligibleLoading = false;
      state.loanEligibleSuccess = false;
      state.loanEligibleError = false;
      state.loanEligibleMessage = "";
      state.loanEligible = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(checkEligibility.pending, (state) => {
        state.loanEligibleLoading = true;
      })
      .addCase(checkEligibility.fulfilled, (state, action) => {
        state.loanEligibleLoading = false;
        state.loanEligibleSuccess = true;
        state.loanEligibleError = false;
        state.loanEligible = action.payload;
      })
      .addCase(checkEligibility.rejected, (state, action) => {
        state.loanEligibleLoading = false;
        state.loanEligibleSuccess = false;
        state.loanEligibleError = true;
        state.loanEligibleMessage = action.payload;
      });
  },
});

export const { resetEigibility } = eligibilitySlice.actions;
export default eligibilitySlice.reducer;
