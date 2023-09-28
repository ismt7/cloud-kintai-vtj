// cspell:words reduxjs
import { configureStore } from "@reduxjs/toolkit";

import loginStaffReducer from "./reducers/loginStaffReducer";

export const store = configureStore({
  reducer: {
    loginStaffReducer,
  },
});

export type AppDispatch = typeof store.dispatch;

export type RootState = ReturnType<typeof store.getState>;

export const selectLoginStaff = (state: RootState) => state.loginStaffReducer;
