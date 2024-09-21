import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: true,
};

export const showCardSlice = createSlice({
  name: "showData",
  initialState: initialState,
  reducers: {
    setShowCard: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { setShowCard } = showCardSlice.actions;

export default showCardSlice.reducer;
