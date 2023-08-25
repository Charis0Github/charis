import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    firstName: '',
    middleName: '',
    surName: '',
    title: '',
    nationality: '',
    homeAddress: '',
    emailAddress: '',
    gender: '',
    phoneNo: '',
    dob: '',
    lga: '',
    file:"",
    profession: '',
    officeAddress: '',
    statusRank: '',
    monthlyIncome: '',
    yearOfService: '',
    retirementAge: '',
};


const formDataSlice = createSlice({
  name: 'formData',
  initialState,
  reducers: {
    updateFormData: (state, action) => {
      const { name, value, files } = action.payload;
      state[name] = name === 'file' ? files[0] : value;
    },
    resetFormData: (state) => {
    state.firstName = '',
    state.middleName =  '',
    state.surName =  '',
    state.title =  '',
    state.nationality =  '',
    state.homeAddress =  '',
    state.emailAddress =  '',
    state.gender =  '',
    state.phoneNo =  '',
    state.dob =  '',
    state.lga =  '',
    state.profession = '',
    profession = '',
    officeAddress = '',
    statusRank = '',
    monthlyIncome = '',
    yearOfService = '',
    retirementAge = '',
    file = ''
    },
  },
});

export const { updateFormData, resetFormData } = formDataSlice.actions;

export default formDataSlice.reducer;