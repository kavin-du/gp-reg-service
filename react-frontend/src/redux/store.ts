import { configureStore } from "@reduxjs/toolkit";
import appointmentReducer from './appointmentsSlice';
import medicalRecordsSlice from "./medicalRecordsSlice";


export const store = configureStore({
  reducer: {
    appointments: appointmentReducer,
    medicalRecords: medicalRecordsSlice
  },
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch