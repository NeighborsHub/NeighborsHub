import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAuthenticated: false,
};

const authSlices = createSlice({
  name: "auth",
  initialState,
  reducers: {
    authenticated: (state, { payload }) => {
      state.isAuthenticated = payload;
    },
    clearAuth: () => initialState,
  },
});

// Action creators are generated for each case reducer function
export const { authenticated, clearAuth } = authSlices.actions;

export const authSelector = (state) => state.auth.isAuthenticated;

export default authSlices.reducer;
