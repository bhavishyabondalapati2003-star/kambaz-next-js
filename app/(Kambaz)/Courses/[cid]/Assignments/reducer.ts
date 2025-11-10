"use client";

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";
import { assignments as dbAssignments } from "../../../Database";

export type Assignment = {
  _id: string;
  title: string;
  description: string;
  points: number;
  due: string;
  available: string;
  course: string;
  editing?: boolean;
};

type AssignmentsState = {
  assignments: Assignment[];
};

const initialState: AssignmentsState = {
  assignments: dbAssignments,
};

const assignmentsSlice = createSlice({
  name: "assignments",
  initialState,
  reducers: {
    addAssignment: (state, action: PayloadAction<{ title: string; course: string }>) => {
      const newAssignment: Assignment = {
        _id: uuidv4(),
        title: action.payload.title || "Untitled Assignment",
        description: "",
        points: 100,
        due: new Date().toISOString(),
        available: new Date().toISOString(),
        course: action.payload.course,
      };
      state.assignments = [...state.assignments, newAssignment];
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

export const { addAssignment, deleteAssignment, editAssignment, updateAssignment } =
  assignmentsSlice.actions;
export default assignmentsSlice.reducer;
