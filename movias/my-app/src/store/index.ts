import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import thunk from "redux-thunk";
import { AuthRecuder } from "../components/auth/AuthReducer";

export const rootReducer = combineReducers({
  auth: AuthRecuder,
});

export const store = configureStore({
  reducer: rootReducer,
  devTools: true,
  middleware: [thunk],
});
