import { ListStateType } from './../utils/types';
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import appointmentService from "../services/appointment.service";

const fetchAppointments = createAsyncThunk(
  'appointments/fetchAppointments',
  async (undefined, thunkApi) => {
    try {
      const resp = await appointmentService.getForUser();
      return resp.data;
    } catch (error: any) {
      return thunkApi.rejectWithValue(error);
    }
  }
);


const initialState = {
  status: 'idle',
  entities: []
} as ListStateType;

const appointmentsSlice = createSlice({
  name: 'appointments',
  initialState,
  reducers: {
    saveAppointments(state, action) {
      state.entities = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchAppointments.fulfilled, (state, action) => {
      state.entities = action.payload;
      state.status = 'idle';
    }),
    builder.addCase(fetchAppointments.pending, (state, _) => {
      state.status = 'pending';
    })
  }
});


export const { saveAppointments } = appointmentsSlice.actions;

export default appointmentsSlice.reducer;