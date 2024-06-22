import { createSlice } from "@reduxjs/toolkit";

const initialState = { mode: "" };

const darkModeSlicer = createSlice({
  name: "Dark Mode",
  initialState,
  reducers: {
    darkModeController: (state, action) => {
      state.mode = action.payload;
    },
  },
});

export const { darkModeController } = darkModeSlicer.actions;
export default darkModeSlicer.reducer;
