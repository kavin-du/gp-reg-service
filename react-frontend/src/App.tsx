import './App.scss';
import { Page } from 'govuk-react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './components/auth/Login';
import Home from './components/Home';
import Signup from './components/auth/Signup';
import Appointments from './components/appointments/Appointments';
import MedicalRecords from './components/MedicalRecords';
import axios from 'axios';
import { Constants } from './utils/constants';


function App() {
  axios.defaults.baseURL = Constants.API_BASE_URL;
  axios.interceptors.response.use(
    response => response,
    error => {
      let message: string = '';
      if(error.response) {
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

  return (
    <Page>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home/>} />
          <Route path='/login' element={<Login/>} />
          <Route path='/signup' element={<Signup/>} />
          <Route path='/appointments' element={<Appointments/>} />
          <Route path='/medical-records' element={<MedicalRecords/>} />
        </Routes>
      </BrowserRouter>
    </Page>
  );
}

export default App;
