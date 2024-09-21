import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: true,
};

export const showDepositSlice = createSlice({
  name: "showDeposit",
  initialState: initialState,
  reducers: {
    setShowDeposit: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { setShowDeposit } = showDepositSlice.actions;

export default showDepositSlice.reducer;
