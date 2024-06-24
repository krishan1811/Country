import { configureStore } from "@reduxjs/toolkit";
import countryReducer from "../Features/countrySlice.js";
import subNavbarReducer from "../Features/subNavbarSlice.js";
import darkModeReducer from "../Features/darkModeSlice.js";
import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";
import { combineReducers } from "@reduxjs/toolkit";

const persistConfig = {
  key: "root",
  version: 1,
  storage,
  blacklist: ["countryFilter"],
};
const reducer = combineReducers({
  countryData: countryReducer,
  countryFilter: subNavbarReducer,
  darkMode: darkModeReducer,
});

const persistedReducer = persistReducer(persistConfig, reducer);

export const store = configureStore({
  reducer: persistedReducer,
});
