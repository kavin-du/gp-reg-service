import './App.scss';
import { Page } from 'govuk-react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './components/auth/Login';
import Home from './components/Home';
import Signup from './components/auth/Signup';
import Appointments from './components/appointments/Appointments';

function App() {
  return (
    <Page>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home/>} />
          <Route path='/login' element={<Login/>} />
          <Route path='/signup' element={<Signup/>} />
          <Route path='/appointments' element={<Appointments/>} />
        </Routes>
      </BrowserRouter>
    </Page>
  );
}

export default App;
