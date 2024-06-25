import { configureStore } from "@reduxjs/toolkit";
import budgetReducer from "./budgetSlice";

// setting up a store for the application and export it
export const store = configureStore({
  reducer: {
    budget: budgetReducer,
  },
});
