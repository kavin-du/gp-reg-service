export class Constants {
  static readonly API_BASE_URL: string = 'http://localhost:3000';
}

export enum APICallStatus {
  IDLE = 'idle',
  LOADING = 'loading',
  FAILED = 'failed',
  SUCCESS = 'success',
  FORCE_REFETCH = 'force_refetch'
}

export enum ROUTES {
  ROOT = '/',
  APPOINTMENTS = '/appointments',
  MEDICAL = '/medical-records',
  LOGIN = '/login',
  SIGNUP = '/signup',
}

export enum Role {
  PATIENT = 'patient',
  DOCTOR = 'doctor',
  RECEPTIONIST = 'receptionist',
}