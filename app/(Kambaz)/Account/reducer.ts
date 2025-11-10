"use client";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import * as db from "../Database"; 


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


type Enrollment = {
  _id: string;
  user: string;
  course: string;
  role: string;
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
      const user = action.payload;

      if (user && user.role) {
        const role = user.role.toUpperCase();

        
        if (["STUDENT", "FACULTY", "TA"].includes(role)) {
          const enrollments = db.enrollments as Enrollment[];
          const enrolled = enrollments
            .filter((e) => e.user === user._id)
            .map((e) => e.course);

          user.enrolledCourses = enrolled;
          console.log(`✅ Enrolled courses for ${user.username}:`, enrolled);
        } else {
          console.log("ℹ️ No enrolled courses added — role:", user.role);
        }
      }

      state.currentUser = user;
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
