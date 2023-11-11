import { combineReducers, configureStore } from "@reduxjs/toolkit";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import formReducer from "./Features/formSlice";
import authReducer from "./Features/authSlice";
import propertyReducer from "./Features/propertySlice";
import affiliateReducer from "./Features/affiliateEnrollSlice";
import userReducer from "./Features/userSlice";
import paymentReducer from "./Features/paymentSlice";
import requestFundReducer from "./Features/requestFundSlice";
import withdrawalDetailsReducer from "./Features/WithdrawalDetailsSlice";
import calculateShareCapitalReducer from "./Features/calculateShareCapitalSlice";
import userWithdrawalReducer from "./Features/userWithdrawalSlice";
import singlePaymentHistoryReducer from "./Features/SinglePaymentHistorySlice";
import pendingWithdrawalReducer from "./Features/pendingWithdrawal";
import approvedWithdrawalReducer from "./Features/approvedWithdrawal";
import allUserPaymentReducer from "./Features/allUserPaymentSlice";
import adminUserPaymentReducer from "./Features/adminUserPayment";
import calculateInvestmentReducer from "./Features/calculateInvestment";
import uploadImageReducer from "./Features/uploadImageSlice";
import eligibilityReducer from "./Features/eligibilitySlice";
import addShoppingPointsReducer from "./Features/addShoppingPointsSlice";
import usersStatusReducer from "./Features/UserStatusSlice";

const reducers = combineReducers({
  formData: formReducer,
  auth: authReducer,
  property: propertyReducer,
  affiliate: affiliateReducer,
  users: userReducer,
  payment: paymentReducer,
  withdrawal: requestFundReducer,
  paymentDetails: withdrawalDetailsReducer,
  shareCapital: calculateShareCapitalReducer,
  userWithdrawal: userWithdrawalReducer,
  singleUserPayment: singlePaymentHistoryReducer,
  pendingWithdrawal: pendingWithdrawalReducer,
  approvedWithdrawal: approvedWithdrawalReducer,
  allPayment: allUserPaymentReducer,
  adminUserPayment: adminUserPaymentReducer,
  calculateInvest: calculateInvestmentReducer,
  imgUpload: uploadImageReducer,
  eligible: eligibilityReducer,
  shoppingPoints: addShoppingPointsReducer,
  usersStat: usersStatusReducer,
});

const persistConfig = {
  key: "charisStorage",
  storage: storage,
  whiteList: ["auth", "formData", "allUsers"],
};

const persistedReducer = persistReducer(persistConfig, reducers);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
  devTools: process.env.NODE_ENV !== "production",
});

export default store;
