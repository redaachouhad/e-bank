import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: true,
};

export const showTransfertSlice = createSlice({
  name: "showTransfert",
  initialState: initialState,
  reducers: {
    setShowTransfert: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { setShowTransfert } = showTransfertSlice.actions;

export default showTransfertSlice.reducer;
