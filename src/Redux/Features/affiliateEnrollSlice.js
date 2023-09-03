import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

//BASE URL
const BASE_URL = "https://motionless-pig-top-hat.cyclic.app/api/v1";

//INITIAL STATE FOR THE AUTH
const initialState = {
  affiliateEnrollError: false,
  affiliateEnrollSuccess: false,
  affiliateEnrollLoading: false,
  affiliateEnrollMessage: "",
};

export const enrollAffiliate = createAsyncThunk(
  "affiliate/enroll",
  async (username, thunkAPI) => {
    const token = localStorage.getItem("token");
    const data = {
      affiliateUserName: username,
    };
    try {
      const response = await axios.patch(
        BASE_URL + "/users/affiliates/reg",
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 200) {
        console.log(
          "Affiliate success response: " + JSON.stringify(response.data)
        );
        return;
      }
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

export const affiliateSlice = createSlice({
  name: "affiliate",
  initialState,
  reducers: {
    resetAffiliate: (state) => {
      state.affiliateEnrollError = false;
      state.affiliateEnrollLoading = false;
      state.affiliateEnrollSuccess = false;
      state.affiliateEnrollMessage = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(enrollAffiliate.pending, (state) => {
        state.affiliateEnrollLoading = true;
      })
      .addCase(enrollAffiliate.fulfilled, (state, action) => {
        state.affiliateEnrollLoading = false;
        state.affiliateEnrollError = false;
        state.affiliateEnrollSuccess = true;
        state.affiliateEnrollMessage = "affliate created successfully";
      })
      .addCase(enrollAffiliate.rejected, (state, action) => {
        state.affiliateEnrollLoading = false;
        state.affiliateEnrollError = true;
        state.affiliateEnrollSuccess = false;
        state.affiliateEnrollMessage = action.payload;
      });
  },
});

export const { resetAffiliate } = affiliateSlice.actions;
export default affiliateSlice.reducer;
