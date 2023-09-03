import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

//BASE URL
const BASE_URL = "https://motionless-pig-top-hat.cyclic.app/api/v1";

//INITIAL STATE FOR THE AUTH
const initialState = {
  property: "",
  propertyError: false,
  propertySuccess: false,
  propertyLoading: false,
  propertyMessage: "",
};

export const getProperty = createAsyncThunk(
  "property/fetch",
  async (thunkAPI) => {
    try {
      const response = await axios.get(BASE_URL + "/property");
      if (response.status === 200) {
        return response.data;
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

export const createProperty = createAsyncThunk(
  "property/create",
  async (body, thunkAPI) => {
    // const token = localStorage.getItem("token");
    try {
      const response = await axios.post(BASE_URL + "/property", body, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      if (response.status === 200) {
        console.log(JSON.stringify(response.data));
        return response.data;
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

export const deleteProperty = createAsyncThunk(
  "property/delete",
  async (id, thunkAPI) => {
    try {
      const response = await axios.delete(BASE_URL + `/property/${id}`);
      if (response.status === 200) {
        return response.data.msg;
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

export const propertySlice = createSlice({
  name: "property",
  initialState,
  reducers: {
    resetProperty: (state) => {
      state.propertyError = false;
      state.propertyLoading = false;
      state.propertySuccess = false;
      state.propertyMessage = "";
    },
    logoutProperty: (state) => {
      state.property = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getProperty.pending, (state) => {
        state.propertyLoading = true;
      })
      .addCase(getProperty.fulfilled, (state, action) => {
        state.propertyLoading = false;
        state.propertyError = false;
        state.propertySuccess = true;
        state.property = action.payload;
      })
      .addCase(getProperty.rejected, (state, action) => {
        state.propertyLoading = false;
        state.propertyError = true;
        state.propertySuccess = false;
        state.propertyMessage = action.payload;
      })

      .addCase(createProperty.pending, (state) => {
        state.propertyLoading = true;
      })
      .addCase(createProperty.fulfilled, (state, action) => {
        state.propertyLoading = false;
        state.propertyError = false;
        state.propertySuccess = true;
        // state.property = action.payload;
      })
      .addCase(createProperty.rejected, (state, action) => {
        state.propertyLoading = false;
        state.propertyError = true;
        state.propertySuccess = false;
        state.propertyMessage = action.payload;
      })

      .addCase(deleteProperty.pending, (state) => {
        state.propertyLoading = true;
      })
      .addCase(deleteProperty.fulfilled, (state, action) => {
        state.propertyLoading = false;
        state.propertyError = false;
        state.propertySuccess = true;
        state.propertyMessage = action.payload;
      })
      .addCase(deleteProperty.rejected, (state, action) => {
        state.propertyLoading = false;
        state.propertyError = true;
        state.propertySuccess = false;
        state.propertyMessage = action.payload;
      });
  },
});

export const { resetProperty, logoutProperty } = propertySlice.actions;
export default propertySlice.reducer;
