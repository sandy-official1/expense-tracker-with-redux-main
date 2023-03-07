import { configureStore } from "@reduxjs/toolkit";

import authReducer from "./auth";
import expenses from "./expenses";

const store = configureStore({
  reducer: {
    auth: authReducer,
    expenses:expenses
  },
});


export default store;