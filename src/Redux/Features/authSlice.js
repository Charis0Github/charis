import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

//BASE URL
const BASE_URL = "https://motionless-pig-top-hat.cyclic.app/api/v1";

// GET USER FROM LOCAL STORAGE
// const user = JSON.parse(localStorage.getItem("user"));

//INITIAL STATE FOR THE AUTH
const initialState = {
  user: {},
  userDetails: {},
  isError: false,
  isSuccess: false,
  isLoading: false,
  isSignInSuccess: false,
  isSignInError: false,
  userDeetsLoading: false,
  userDeetsSuccess: false,
  userDeetsError: false,
  message: "",
};

export const createUser = createAsyncThunk(
  "auth/create",
  async (createUser, thunkAPI) => {
    console.log("USER REQUEST: " + JSON.stringify(createUser));
    try {
      const response = await axios.post(
        BASE_URL + "/auth/register",
        createUser
      );
      console.log(response.data);
      if (response.status === 201) {
        console.log("user created successfully");
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

export const loginUser = createAsyncThunk(
  "auth/login",
  async (createUser, thunkAPI) => {
    // console.log("Login REQUEST: " + JSON.stringify(createUser))
    try {
      const response = await axios.post(BASE_URL + "/auth", createUser);
      console.log(response.data);
      if (response.status === 200) {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("uid", response.data._id);
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
export const forgotPassword = createAsyncThunk(
  "auth/forgotPassword",
  async (createUser, thunkAPI) => {
    // console.log("forgot REQUEST: " + JSON.stringify(createUser));
    try {
      const response = await axios.post(
        BASE_URL + "/auth/forgotPassword",
        createUser
      );
      console.log(response.data);
      if (response.status === 200) {
        return response.data;
      }
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
export const resetPassword = createAsyncThunk(
  "/resetPassword",
  async (createUser, thunkAPI) => {
    // console.log("forgot REQUEST: " + JSON.stringify(createUser));
    try {
      const response = await axios.post(
        BASE_URL + "/resetPassword",
        createUser
      );
      // console.log(response.data);
      if (response.status === 200) {
        return response.data;
      }
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

export const getUserDetails = createAsyncThunk(
  "auth/userDeets",
  async (thunkAPI) => {
    const id = localStorage.getItem("uid");
    const token = localStorage.getItem("token");
    // console.log("USER ID: " + id);
    try {
      const response = await axios.get(BASE_URL + `/users/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.status === 200) {
        return response.data;
      }
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

export const authSlice = createSlice({
  name: "auth",
  initialState,
  // RESET STATE ACTION
  reducers: {
    reset: (state) => {
      state.isError = false;
      state.isLoading = false;
      state.isSuccess = false;
      (state.isSignInSuccess = false),
        (state.isSignInError = false),
        (state.message = "");
    },
    logOut: (state) => {
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // CREATE USER HANDLER
      .addCase(createUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createUser.fulfilled, (state) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.message = "Account Created successfully";
      })
      .addCase(createUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.user = null;
      })

      // LOGIN USER HANDLER
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
      })
      // LOGIN USER HANDLER
      .addCase(forgotPassword.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(resetPassword.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(forgotPassword.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSignInSuccess = true;
        state.isSignInError = false;
        state.user = action.payload;
      })
      .addCase(resetPassword.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSignInSuccess = true;
        state.isSignInError = false;
        state.user = action.payload;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSignInSuccess = true;
        state.isSignInError = false;
        state.user = action.payload;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.user = null;
      })
      .addCase(forgotPassword.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.user = null;
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.user = null;
      })

      // USER DETAILS HANDLER
      .addCase(getUserDetails.pending, (state) => {
        state.userDeetsLoading = true;
      })
      .addCase(getUserDetails.fulfilled, (state, action) => {
        state.userDeetsLoading = false;
        state.userDeetsSuccess = true;
        state.userDeetsError = false;
        state.userDetails = action.payload;
      })
      .addCase(getUserDetails.rejected, (state, action) => {
        state.userDeetsLoading = false;
        state.userDeetsSuccess = false;
        state.userDeetsError = true;
        state.message = action.payload;
      });
  },
});

export const { reset, logOut } = authSlice.actions;
export default authSlice.reducer;
