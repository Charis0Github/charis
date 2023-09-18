import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

//BASE URL
const BASE_URL = "https://motionless-pig-top-hat.cyclic.app/api/v1";

const initialState = {
  withdrawalDeetsLoading: false,
  withdrawalDeetsSuccess: false,
  withdrawalDeetsError: false,
  withdrawalDeetsMessage: "",
};

export const withdrawalDetailsUpdate = createAsyncThunk(
  "withdrawalDetails/update",
  async (reqBody, thunkAPI) => {
    const token = localStorage.getItem("token");
    const id = localStorage.getItem("uid");
    try {
      const response = await axios.patch(
        BASE_URL + `/users/editUserUnstructured/${id}`,
        reqBody,
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

const withdrawalDetailsSlice = createSlice({
  name: "withdrawalDetails",
  initialState,
  reducers: {
    resetWithdrawal: (state) => {
      state.withdrawalDeetsLoading = false;
      state.withdrawalDeetsSuccess = false;
      state.withdrawalDeetsError = false;
      state.withdrawalDeetsMessage = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(withdrawalDetailsUpdate.pending, (state) => {
        state.withdrawalDeetsLoading = true;
      })
      .addCase(withdrawalDetailsUpdate.fulfilled, (state, action) => {
        state.withdrawalDeetsLoading = false;
        state.withdrawalDeetsSuccess = true;
        state.withdrawalDeetsError = false;
        state.withdrawalDeetsMessage = action.payload;
      })
      .addCase(withdrawalDetailsUpdate.rejected, (state, action) => {
        state.withdrawalDeetsLoading = false;
        state.withdrawalDeetsSuccess = false;
        state.withdrawalDeetsError = true;
        state.withdrawalDeetsMessage = action.payload;
      });
  },
});

export const { resetWithdrawal } = withdrawalDetailsSlice.actions;
export default withdrawalDetailsSlice.reducer;
