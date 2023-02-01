import { configureStore } from "@reduxjs/toolkit";
// eslint-disable-next-line import/no-cycle
import timeRecordReducer from "./timeRecordSlice";

export const store = configureStore({
  reducer: {
    timeRecordReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
