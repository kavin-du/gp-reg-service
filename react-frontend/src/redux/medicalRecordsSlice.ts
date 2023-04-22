import { ListStateType, VaccinationRecordType } from './../utils/types';
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { APICallStatus } from '../utils/constants';
import medicalRecordService from '../services/medical-record.service';

export const fetchUserMedicalRecords = createAsyncThunk(
  'medical-records/fetchUser',
  async (_, thunkApi) => {
    try {
      const resp = await medicalRecordService.getUser();
      return resp.data;
    } catch (error: any) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

export const fetchAllMedicalRecords = createAsyncThunk(
  'medical-records/fetchAll',
  async (_, thunkApi) => {
    try {
      const resp = await medicalRecordService.getAll();
      return resp.data;
    } catch (error: any) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

type MedicalRecordStateType = ListStateType & {
  entities: VaccinationRecordType[]
}

const initialState = {
  status: APICallStatus.IDLE,
  entities: [],
  error: undefined,
} as MedicalRecordStateType;

const medicalRecordsSlice = createSlice({
  name: 'medicalRecords',
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {builder
    // get user med records
    .addCase(fetchUserMedicalRecords.fulfilled, (state, action) => {
      state.entities = action.payload;
      state.status =  APICallStatus.SUCCESS;
    })
    .addCase(fetchUserMedicalRecords.pending, (state, _) => {
      state.status = APICallStatus.LOADING;
    })
    .addCase(fetchUserMedicalRecords.rejected, (state, action) => {
      state.status = APICallStatus.FAILED;
      state.error = action.payload as string ?? action.error.message;
    })

    // get all med records
    .addCase(fetchAllMedicalRecords.fulfilled, (state, action) => {
      state.entities = action.payload;
      state.status =  APICallStatus.SUCCESS;
    })
    .addCase(fetchAllMedicalRecords.pending, (state, _) => {
      state.status = APICallStatus.LOADING;
    })
    .addCase(fetchAllMedicalRecords.rejected, (state, action) => {
      state.status = APICallStatus.FAILED;
      state.error = action.payload as string ?? action.error.message;
    })
  }
});


export default medicalRecordsSlice.reducer;