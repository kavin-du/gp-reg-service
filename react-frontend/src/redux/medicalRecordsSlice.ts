import { ListStateType, VaccinationRecordType } from './../utils/types';
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { APICallStatus } from '../utils/constants';
import medicalRecordService from '../services/medical-record.service';

export const fetchMedicalRecords = createAsyncThunk(
  'medical-records/fetch',
  async (_, thunkApi) => {
    try {
      const resp = await medicalRecordService.get();
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
    // get med records
    .addCase(fetchMedicalRecords.fulfilled, (state, action) => {
      state.entities = action.payload;
      state.status =  APICallStatus.SUCCESS;
    })
    .addCase(fetchMedicalRecords.pending, (state, _) => {
      state.status = APICallStatus.LOADING;
    })
    .addCase(fetchMedicalRecords.rejected, (state, action) => {
      state.status = APICallStatus.FAILED;
      state.error = action.payload as string ?? action.error.message;
    })
  }
});


export default medicalRecordsSlice.reducer;