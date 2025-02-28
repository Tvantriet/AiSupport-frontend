import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "./store";

const initialState: any = {
  onboardingCompleted: false,
};

export const generalSlice = createSlice({
  name: "General",
  initialState,
  reducers: {
    setOnboardingComplete: (state, action: PayloadAction<boolean>) => {
      state.onboardingCompleted = action.payload;
    },
  },
});

export const { setOnboardingComplete } = generalSlice.actions;

export const getOnboardingCompleted = (state: RootState) => state.general.onboardingCompleted;

export default generalSlice.reducer;
