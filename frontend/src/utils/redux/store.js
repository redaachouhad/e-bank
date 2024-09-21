import { configureStore } from "@reduxjs/toolkit";
import resDataSliceReducer from "./slices/resDataSlice";
import showCardSliceReducer from "./slices/showCardSlice";
import showDepositSliceReducer from "./slices/showDepositSlice.js";
import showTableTransactionSliceReducer from "./slices/showTableTransactionSlice";
import showTransfertSliceReducer from "./slices/showTransfertSlice.js";

export default configureStore({
  reducer: {
    resData: resDataSliceReducer,
    showCard: showCardSliceReducer,
    showTableTransaction: showTableTransactionSliceReducer,

    showTransfert: showTransfertSliceReducer,
    showDeposit: showDepositSliceReducer,
  },
});
