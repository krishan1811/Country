import { createSlice } from "@reduxjs/toolkit";

const initialState = { value: [], continent: [], countryName: [] };

const subNavbarSlicer = createSlice({
  name: "subNavbarSlicer",
  initialState,
  reducers: {
    cardFilter: (state, action) => {
      state.value = action.payload;
    },
    optionFilter: (state, action) => {
      state.continent = action.payload;
    },
    getCountry: (state, action) => {
      state.countryName = action.payload;
    },
  },
});

export const { cardFilter, optionFilter, getCountry } = subNavbarSlicer.actions;
export default subNavbarSlicer.reducer;
