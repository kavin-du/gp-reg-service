import { Role } from './../utils/constants';
import axios from "axios";

class AuthService {
  
  login(nhsNumber: string, password: string, role: Role) {
    if(role === Role.PATIENT) return axios.post('/auth/login/patient', { nhsNumber, password } );
    if(role === Role.DOCTOR) return axios.post('/auth/login/doctor', { nhsNumber, password } );
    return axios.post('/auth/login/receptionist', { nhsNumber, password } ); 
  }

  register(nhsNumber: string, firstname: string, surname: string, password: string, role: Role) {
    if(role === Role.PATIENT) return axios.post('/users/patient', { nhsNumber, password } );
    if(role === Role.DOCTOR) return axios.post('/users/doctor', { nhsNumber, firstname, surname, password } );
    return axios.post('/users/receptionist', { nhsNumber, firstname, surname, password } ); 
  }
}

export default new AuthService();