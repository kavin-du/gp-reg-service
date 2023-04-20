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

export const createAppointment = createAsyncThunk(
  'appointments/createAppointment',
  async (reason: string, thunkApi) => {
    try {
      const resp = await appointmentService.create(reason);
      return resp.data;
    } catch (error: any) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

export const deleteAppointment = createAsyncThunk(
  'appointments/deleteAppointment',
  async (id: number, thunkApi) => {
    try {
      const resp = await appointmentService.delete(id);
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
    // saveAppointments(state, action) {
    //   state.entities = action.payload;
    // }
  },
  extraReducers: (builder) => {builder
    // get appointment
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
    // create appointments
    .addCase(createAppointment.fulfilled, (state, _) => {
      state.status =  APICallStatus.IDLE; // to refresh all appointments again
    })
    .addCase(createAppointment.pending, (state, _) => {
      state.status = APICallStatus.LOADING;
    })
    .addCase(createAppointment.rejected, (state, action) => {
      state.status = APICallStatus.FAILED;
      state.error = action.payload as string ?? action.error.message;
    })
    // delete appointment
    .addCase(deleteAppointment.fulfilled, (state, _) => {
      state.status =  APICallStatus.IDLE; // to refresh all appointments again
    })
    .addCase(deleteAppointment.pending, (state, _) => {
      state.status = APICallStatus.LOADING;
    })
    .addCase(deleteAppointment.rejected, (state, action) => {
      state.status = APICallStatus.FAILED;
      state.error = action.payload as string ?? action.error.message;
    })
    
  }
});


// export const { saveAppointments } = appointmentsSlice.actions;

export default appointmentsSlice.reducer;