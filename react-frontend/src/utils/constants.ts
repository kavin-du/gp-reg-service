export class Constants {
  static readonly API_BASE_URL: string = 'http://localhost:3000';
}

export enum APICallStatus {
  IDLE = 'idle',
  LOADING = 'loading',
  FAILED = 'failed',
  SUCCESS = 'success',
}

export enum ROUTES {
  HOME = '/',
  APPOINTMENTS = '/appointments',
  MEDICAL = '/medical-records',
  LOGIN = '/login',
  SIGNUP = '/signup',
}
