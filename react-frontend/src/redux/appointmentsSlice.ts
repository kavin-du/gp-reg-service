import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  status: 'idle',
  entities: {}
}

const appointmentsSlice = createSlice({
  name: 'appointments',
  initialState,
  reducers: {
    saveAppointments(state, action) {
      state.entities = action.payload;
    }
  }
});


export const { saveAppointments } = appointmentsSlice.actions;

export default appointmentsSlice.reducer;