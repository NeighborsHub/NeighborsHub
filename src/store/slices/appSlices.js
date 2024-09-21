import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: 0,
  isMobile: null,
};

const appSlices = createSlice({
  name: "app",
  initialState,
  reducers: {
    startLoading: (state) => {
      state.loading += 1;
    },
    endLoading: (state) => {
      if (state.loading) state.loading -= 1;
    },
    clearApp: () => initialState,
    setIsMobile: (state, {payload}) => {
      state.isMobile = payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { startLoading, endLoading, clearApp, setIsMobile } =
  appSlices.actions;

export const loadingSelector = (state) => state.app.loading;
export const isMobileSelector = (state) => state.app.isMobile;

export default appSlices.reducer;
