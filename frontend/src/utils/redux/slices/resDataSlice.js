import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: {
    user: {
      email: "...",
      firstName: "...",
      id: 0,
      lastName: "...",
      password: "There is no password here !!!",
      phoneNumber: ".....",
      type: "...",
    },
    account: {
      accountBalance: 0,
      accountNumber: 0,
      cvc: "000",
      expiration: "00/00",
      id: 0,
      numberOfCard: "0000000000000",
      userId: 0,
    },
    transactionList: [],
  },
};

export const resDataSlice = createSlice({
  name: "resData",
  initialState: initialState,
  reducers: {
    setResData: (state, action) => {
      state.value = action.payload;
    },
    setUser: (state, action) => {
      state.value.user = action.payload;
    },
    setTransaction: (state, action) => {
      state.value.transaction = action.payload;
    },
    setAccount: (state, action) => {
      state.value.account = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setTransaction, setAccount, setUser, setResData } =
  resDataSlice.actions;

export default resDataSlice.reducer;
