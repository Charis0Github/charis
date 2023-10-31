import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

//BASE URL
const BASE_URL = "https://motionless-pig-top-hat.cyclic.app/api/v1";

const initialState = {
  shoppingPointsLoading: false,
  shoppingPointsSuccess: false,
  shoppingPointsError: false,
  shoppingPointsMessage: "",
};

export const uploadPoints = createAsyncThunk(
  "addShoppingPoints/update",
  async (reqBody, thunkAPI) => {
    const token = localStorage.getItem("token");
    const id = reqBody.uid;
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

const addShoppingPointsSlice = createSlice({
  name: "addShoppingPoints",
  initialState,
  reducers: {
    resetShoppingPoints: (state) => {
      state.shoppingPointsLoading = false;
      state.shoppingPointsSuccess = false;
      state.shoppingPointsError = false;
      state.shoppingPointsMessage = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(uploadPoints.pending, (state) => {
        state.shoppingPointsLoading = true;
      })
      .addCase(uploadPoints.fulfilled, (state, action) => {
        state.shoppingPointsLoading = false;
        state.shoppingPointsSuccess = true;
        state.shoppingPointsError = false;
        state.shoppingPointsMessage = action.payload;
      })
      .addCase(uploadPoints.rejected, (state, action) => {
        state.shoppingPointsLoading = false;
        state.shoppingPointsSuccess = false;
        state.shoppingPointsError = true;
        state.shoppingPointsMessage = action.payload;
      });
  },
});

export const { resetShoppingPoints } = addShoppingPointsSlice.actions;
export default addShoppingPointsSlice.reducer;
