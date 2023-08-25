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

const reducers = combineReducers({
  formData: formReducer,
  auth: authReducer,
  property: propertyReducer,
});

const persistConfig = {
  key: "charisStorage",
  storage: storage,
  whiteList: ["auth", "formData"],
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
