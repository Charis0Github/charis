import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

//BASE URL
const BASE_URL = "https://motionless-pig-top-hat.cyclic.app/api/v1";

const initialState = {
  title: "",
  nationality: "",
  address: "",
  gender: "",
  dob: "",
  lga: "",
  profession: "",
  officeAddress: "",
  statusRank: "",
  monthlyIncome: "",
  yearsOfService: "",
  retirementAge: "",
  educationalQualification: "",
  nextOfKinName: "",
  nextOfKinAddress: "",
  relationship: "",
  nextOfKinPhoneNumber: "",
  nextOfKinEmail: "",
  houseSize: "",
  houseType: "",
  preferredLocation: "",
  paymentPlan: "",
  file: null,

  corporativeLoading: false,
  corporativeSuccess: false,
  corporativeError: false,
  corporativeMessage: "",
};

export const corporativeRegister = createAsyncThunk(
  "formData/submit",
  async (body, thunkAPI) => {
    const id = localStorage.getItem("uid");
    const token = localStorage.getItem("token");
    try {
      const response = await axios.patch(BASE_URL + `/users/${id}`, body, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(response.data);
    } catch (error) {
      if (error.response) {
        const obj = error.response.data;
        const objKey = Object.keys(obj)[0];
        let err = obj[objKey];
        console.log("RESPONSE ERROR" + err);
        return thunkAPI.rejectWithValue(err);
      } else if (error.request) {
        console.log("REQUEST ERROR" + error.request);
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

const formDataSlice = createSlice({
  name: "formData",
  initialState,
  reducers: {
    updateFormData: (state, action) => {
      const { name, value, files } = action.payload;
      state[name] = name === "file" ? files[0] : value;
    },
    setImage: (state, action) => {
      state.file = action.payload;
    },
    resetFormData: (state) => {
      state.title = "";
      state.nationality = "";
      state.address = "";
      state.gender = "";
      state.dob = "";
      state.lga = "";
      state.profession = "";
      state.officeAddress = "";
      state.statusRank = "";
      state.monthlyIncome = "";
      state.yearsOfService = "";
      state.retirementAge = "";
      state.educationalQualification = "";
      state.nextOfKinName = "";
      state.nextOfKinAddress = "";
      state.relationship = "";
      state.nextOfKinPhoneNumber = "";
      state.nextOfKinEmail = "";
      state.houseSize = "";
      state.houseType = "";
      state.preferredLocation = "";
      state.paymentPlan = "";
      state.file = null;
    },

    resetCorporativeRegister: (state) => {
      state.corporativeLoading = false;
      state.corporativeSuccess = false;
      state.corporativeError = false;
      state.corporativeMessage = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(corporativeRegister.pending, (state) => {
        state.corporativeLoading = true;
      })
      .addCase(corporativeRegister.fulfilled, (state, action) => {
        state.corporativeLoading = false;
        state.corporativeSuccess = true;
        state.corporativeError = false;
        state.corporativeMessage = action.payload;
      })
      .addCase(corporativeRegister.rejected, (state, action) => {
        state.corporativeLoading = false;
        state.corporativeSuccess = false;
        state.corporativeError = true;
        state.corporativeMessage = action.payload;
      });
  },
});

export const {
  updateFormData,
  resetFormData,
  setImage,
  resetCorporativeRegister,
} = formDataSlice.actions;
export default formDataSlice.reducer;
