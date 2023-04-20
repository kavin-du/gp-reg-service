import './App.scss';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './components/auth/Login';
import Home from './components/Home';
import Signup from './components/auth/Signup';
import Appointments from './components/appointments/Appointments';
import MedicalRecords from './components/MedicalRecords';
import axios from 'axios';
import { Constants, ROUTES } from './utils/constants';


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
        message = error.request;
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
        <Route path={ROUTES.HOME} element={<Home />} />
        <Route path={ROUTES.LOGIN} element={<Login />} />
        <Route path={ROUTES.SIGNUP} element={<Signup />} />
        <Route path={ROUTES.APPOINTMENTS} element={<Appointments />} />
        <Route path={ROUTES.MEDICAL} element={<MedicalRecords />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
