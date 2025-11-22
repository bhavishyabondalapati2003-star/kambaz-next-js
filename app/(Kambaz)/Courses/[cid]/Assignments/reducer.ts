"use client";

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type Assignment = {
  _id: string;
  title: string;
  description: string;
  points: number;
  due: string;
  available: string;
  until?: string;        // ✅ Add this line
  course: string;
  editing?: boolean;
};

type AssignmentsState = {
  assignments: Assignment[];
};

const initialState: AssignmentsState = {
  assignments: [],
};

const assignmentsSlice = createSlice({
  name: "assignments",
  initialState,
  reducers: {
    setAssignments: (state, action: PayloadAction<Assignment[]>) => {
      state.assignments = action.payload;
    },
    addAssignment: (state, action: PayloadAction<Assignment>) => {
      state.assignments = [...state.assignments, action.payload];
    },
    deleteAssignment: (state, action: PayloadAction<string>) => {
      state.assignments = state.assignments.filter((a) => a._id !== action.payload);
    },
    editAssignment: (state, action: PayloadAction<string>) => {
      state.assignments = state.assignments.map((a) =>
        a._id === action.payload ? { ...a, editing: true } : a
      );
    },
    updateAssignment: (state, action: PayloadAction<Assignment>) => {
      state.assignments = state.assignments.map((a) =>
        a._id === action.payload._id ? action.payload : a
      );
    },
  },
});

export const { setAssignments, addAssignment, deleteAssignment, editAssignment, updateAssignment } =
  assignmentsSlice.actions;
export default assignmentsSlice.reducer;