import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

//BASE URL
const BASE_URL = "https://api.calgi.org/api/v1";

const initialState = {
  shareCapital: null,
  calculateShareLoading: false,
  calculateShareSuccess: false,
  calculateShareError: false,
  calculateShareMessage: "",
};

export const getShareCapital = createAsyncThunk(
  "calculateShare/fetch",
  async (body, thunkAPI) => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.post(
        BASE_URL + `/users/shareCapital`,
        body,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
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

const calculateShareCapitalSlice = createSlice({
  name: "calculateShare",
  initialState,
  reducers: {
    resetShareCapital: (state) => {
      state.calculateShareLoading = false;
      state.calculateShareSuccess = false;
      state.calculateShareError = false;
      state.calculateShareMessage = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getShareCapital.pending, (state) => {
        state.calculateShareLoading = true;
      })
      .addCase(getShareCapital.fulfilled, (state, action) => {
        state.calculateShareLoading = false;
        state.calculateShareSuccess = true;
        state.calculateShareError = false;
        state.shareCapital = action.payload;
      })
      .addCase(getShareCapital.rejected, (state, action) => {
        state.calculateShareLoading = false;
        state.calculateShareSuccess = false;
        state.calculateShareError = true;
        state.calculateShareMessage = action.payload;
      });
  },
});

export const { resetShareCapital } = calculateShareCapitalSlice.actions;
export default calculateShareCapitalSlice.reducer;
