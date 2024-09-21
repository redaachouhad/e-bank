import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: true,
};

export const showTableTransactionSlice = createSlice({
  name: "showTableTransaction",
  initialState: initialState,
  reducers: {
    setShowTableTransaction: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { setShowTableTransaction } = showTableTransactionSlice.actions;

export default showTableTransactionSlice.reducer;
