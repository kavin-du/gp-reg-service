import './App.scss';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Login from './components/auth/Login';
import Signup from './components/auth/Signup';
import Appointments from './components/appointments/Appointments';
import MedicalRecords from './components/medical-records/MedicalRecords';
import axios from 'axios';
import { Constants, ROUTES } from './utils/constants';
import PrivateRoute from './components/auth/PrivateRoute';
import NotFoundPage from './components/NotFoundPage';


function App() {
  axios.defaults.baseURL = Constants.API_BASE_URL;
  axios.interceptors.response.use(
    response => response,
    error => {
      let message: string = '';
      if (error.response) {
        // response was made and server responded with status code
        message = error.response.data.message.toString();
      } else if (error.request) {
        // request was made but no response was received
        // message = error.request;
        message = 'Please check your connection!';
      } else {
        message = error.message;
      }
      return Promise.reject({ message });
    }
  );

  axios.interceptors.request.use(
    config => {
      if (!config.headers.Authorization) {
        const token = localStorage.getItem('access_token');
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
      }
      return config;
    },
    error => Promise.reject(error)
  );

  return (
    <BrowserRouter>
      <Routes>
        <Route path={ROUTES.ROOT} element={<Navigate to={ROUTES.LOGIN} replace />} />
        <Route path={ROUTES.LOGIN} element={<Login />} />
        <Route path={ROUTES.SIGNUP} element={<Signup />} />

        <Route element={<PrivateRoute />}>
          <Route path={ROUTES.APPOINTMENTS} element={<Appointments />} />
          <Route path={ROUTES.MEDICAL} element={<MedicalRecords />} />
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
