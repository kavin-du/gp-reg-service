import { ListStateType, AppointmentType } from './../utils/types';
import { ActionReducerMapBuilder, AsyncThunk, createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import appointmentService from "../services/appointment.service";
import { APICallStatus } from '../utils/constants';

export const fetchUserAppointments = createAsyncThunk(
  'appointments/fetchUserAppointments',
  async (_, thunkApi) => {
    try {
      const resp = await appointmentService.getForUser();
      return resp.data;
    } catch (error: any) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

export const fetchAllAppointments = createAsyncThunk(
  'appointments/fetchAllAppointments',
  async (_, thunkApi) => {
    try {
      const resp = await appointmentService.getAll();
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

type UpdateAppointmenArgument = {
  id: number;
  reason: string;
}

export const updateAppointment = createAsyncThunk(
  'appointments/updateAppointment',
  async (payload: UpdateAppointmenArgument, thunkApi) => {
    const { id, reason } = payload;
    try {
      const resp = await appointmentService.update(id, reason);
      return resp.data;
    } catch (error: any) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

const addBuilderCase = (
  builder: ActionReducerMapBuilder<any>, 
  thunk: AsyncThunk<any, any, any>,
  updateEntities: boolean = false
  ) => {
    builder 
      .addCase(thunk.fulfilled, (state, action) => {
        if(updateEntities) {
          state.entities = action.payload;
          state.status = APICallStatus.SUCCESS;
        } 
        // if there is nothing to update, then it is a create, put, delete call
        // in that case, we need to to refresh all appointments again
        else state.status = APICallStatus.FORCE_REFETCH;
      })
      .addCase(thunk.pending, (state, _) => {
        state.status = APICallStatus.LOADING;
      })
      .addCase(thunk.rejected, (state, action: any) => {
        state.status = APICallStatus.FAILED;
        state.error = action.payload as string ?? action.error.message;
      });
}

type AppointmentsStateType = ListStateType & {
  entities: AppointmentType[]
}

const initialState = {
  status: APICallStatus.IDLE,
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
  extraReducers: (builder) => {
    addBuilderCase(builder, fetchUserAppointments, true);
    addBuilderCase(builder, fetchAllAppointments, true);
    addBuilderCase(builder, createAppointment);
    addBuilderCase(builder, deleteAppointment);
    addBuilderCase(builder, updateAppointment);
  }
});


// export const { saveAppointments } = appointmentsSlice.actions;

export default appointmentsSlice.reducer;