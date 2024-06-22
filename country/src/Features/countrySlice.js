import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  data: [],
  isLoading: "idle",
  error: null,
};

export const countryApi = createAsyncThunk("components/country", async () => {
  try {
    const data = await axios.get(`https://country-ruddy.vercel.app/`);
    return data.data;
  } catch (error) {
    console.log(error);
  }
});

const countrySlice = createSlice({
  name: "countryState",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(countryApi.pending, (state) => {
        state.isLoading = "loading";
      })
      .addCase(countryApi.fulfilled, (state, action) => {
        state.isLoading = "succeeded";
        state.data = action.payload;
      })
      .addCase(countryApi.rejected, (state, action) => {
        state.isLoading = "failed";
        state.error = action.payload.errorMessage;
      });
  },
});

export default countrySlice.reducer;
