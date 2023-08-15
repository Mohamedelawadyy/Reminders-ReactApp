import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { remindersReducer } from "./slices/reminderSlice";

const nonSerializableValuesMiddleware = (store) => (next) => (action) => {
  // Handle non-serializable values in the action payload
  if (action.payload && action.payload.date instanceof Date) {
    action.payload.date = action.payload.date.toISOString();
  }

  return next(action);
};

export const store = configureStore({
  reducer: {
    reminders: remindersReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(nonSerializableValuesMiddleware),
});
