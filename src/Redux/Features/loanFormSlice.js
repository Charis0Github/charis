import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

//BASE URL
const BASE_URL = "https://motionless-pig-top-hat.cyclic.app/api/v1";

const initialState = {
  firstName: "",
  phoneNumber: "",
  address: "",
  email: "",
  dob: "",
  currentEmployer: "",
  jobTitle: "",
  workAddress: "",
  workPhoneNumber: "",
  monthlySalary: "",

  loanAmountRequested: "",
  loanPurpose: "",
  preferredLoanTerms: "",

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

  loanLoading: false,
  loanSuccess: false,
  loanError: false,
  loanMessage: "",
};

export const loanRequest = createAsyncThunk(
  "loanFormData/submit",
  async (body, thunkAPI) => {
    const id = localStorage.getItem("uid");
    const token = localStorage.getItem("token");
    try {
      const response = await axios.patch(BASE_URL + `/users/${id}`, body, {
        headers: {
          Authorization: `Bearer ${token}`,
          "content-type": "multipart/form-data",
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

const loanFormDataSlice = createSlice({
  name: "loanFormData",
  initialState,
  reducers: {
    updateLoanFormData: (state, action) => {
      const { name, value, files } = action.payload;
      state[name] = name === "file" ? files[0] : value;
    },

    resetLoanFormData: (state) => {
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

    resetLoanRequest: (state) => {
      state.loanLoading = false;
      state.loanSuccess = false;
      state.loanError = false;
      state.loanMessage = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loanRequest.pending, (state) => {
        state.loanLoading = true;
      })
      .addCase(loanRequest.fulfilled, (state, action) => {
        state.loanLoading = false;
        state.loanSuccess = true;
        state.loanError = false;
        state.loanMessage = action.payload;
      })
      .addCase(loanRequest.rejected, (state, action) => {
        state.loanLoading = false;
        state.loanSuccess = false;
        state.loanError = true;
        state.loanMessage = action.payload;
      });
  },
});

export const { updateLoanFormData, resetLoanFormData, resetLoanRequest } =
  loanFormDataSlice.actions;
export default loanFormDataSlice.reducer;
