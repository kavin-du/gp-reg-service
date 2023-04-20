import { ListStateType, AppointmentType } from './../utils/types';
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import appointmentService from "../services/appointment.service";
import { APICallStatus } from '../utils/constants';

export const fetchAppointments = createAsyncThunk(
  'appointments/fetchAppointments',
  async (_, thunkApi) => {
    try {
      const resp = await appointmentService.getForUser();
      return resp.data;
    } catch (error: any) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

type AppointmentsStateType = ListStateType & {
  entities: AppointmentType[]
}

const initialState = {
  status: 'idle',
  entities: [],
  error: undefined,
} as AppointmentsStateType;

const appointmentsSlice = createSlice({
  name: 'appointments',
  initialState,
  reducers: {
    saveAppointments(state, action) {
      state.entities = action.payload;
    }
  },
  extraReducers: (builder) => {builder
    .addCase(fetchAppointments.fulfilled, (state, action) => {
      state.entities = action.payload;
      state.status =  APICallStatus.SUCCESS;
    })
    .addCase(fetchAppointments.pending, (state, _) => {
      state.status = APICallStatus.LOADING;
    })
    .addCase(fetchAppointments.rejected, (state, action) => {
      state.status = APICallStatus.FAILED;
      state.error = action.payload as string ?? action.error.message;
    })
  }
});


export const { saveAppointments } = appointmentsSlice.actions;

export default appointmentsSlice.reducer;