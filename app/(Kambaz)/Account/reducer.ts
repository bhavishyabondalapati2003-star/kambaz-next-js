"use client";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type User = {
  _id: string;
  username: string;
  password: string;
  firstName: string;
  lastName: string;
  email?: string;
  dob?: string;
  role?: "USER" | "ADMIN" | "FACULTY" | "STUDENT" | "TA";
  enrolledCourses?: string[];
  [key: string]: unknown;
};

type AccountState = {
  currentUser: User | null;
};

const initialState: AccountState = {
  currentUser: null,
};

const accountSlice = createSlice({
  name: "account",
  initialState,
  reducers: {
    setCurrentUser: (state, action: PayloadAction<User | null>) => {
      state.currentUser = action.payload;
    },

    enrollCourse: (state, action: PayloadAction<string>) => {
      if (state.currentUser) {
        const enrolled = state.currentUser.enrolledCourses || [];
        if (!enrolled.includes(action.payload)) {
          state.currentUser.enrolledCourses = [...enrolled, action.payload];
        }
      }
    },

    unenrollCourse: (state, action: PayloadAction<string>) => {
      if (state.currentUser) {
        state.currentUser.enrolledCourses = (
          state.currentUser.enrolledCourses || []
        ).filter((cid) => cid !== action.payload);
      }
    },
  },
});

export const { setCurrentUser, enrollCourse, unenrollCourse } =
  accountSlice.actions;
export default accountSlice.reducer;