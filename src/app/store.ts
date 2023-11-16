import { Action, configureStore, ThunkAction } from "@reduxjs/toolkit";

// eslint-disable-next-line import/no-cycle
import loginStaffReducer from "../lib/reducers/loginStaffReducer";
// eslint-disable-next-line import/no-cycle
import snackbarReducer from "../lib/reducers/snackbarReducer";

export const store = configureStore({
  reducer: {
    loginStaffReducer,
    snackbar: snackbarReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
