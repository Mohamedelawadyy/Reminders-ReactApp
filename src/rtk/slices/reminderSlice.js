import { createSlice } from "@reduxjs/toolkit";
import { bake_cookie, read_cookie } from "sfcookies";

const reminderSlice = createSlice({
  name: "reminderSlice",
  initialState: read_cookie("reminders") || [],

  reducers: {
    addReminder: (state, action) => {
      state.push(action.payload);
      bake_cookie("reminders", state);
      return state;
    },
    clearReminders: (state) => {
      state = [];
      bake_cookie("reminders", state);
      return state;
    },
    removeReminder: (state, action) => {
      const newState=state.filter((item) => item.id !== action.payload);
      bake_cookie("reminders", newState);
      return newState;
    },
  },
});

export const { addReminder, clearReminders, removeReminder } =
  reminderSlice.actions;
export const remindersReducer = reminderSlice.reducer;
