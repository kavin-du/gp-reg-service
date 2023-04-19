import { configureStore } from "@reduxjs/toolkit";
import appointmentsSlice from "./appointmentsSlice";

const store = configureStore({
  reducer: appointmentsSlice,
});

export default store;