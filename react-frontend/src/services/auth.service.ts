import { Role } from './../utils/constants';
import axios from "axios";

class AuthService {
  
  login(nhsNumber: string, password: string, role: Role) {
    if(role === Role.PATIENT) return axios.post('/auth/login/patient', { nhsNumber, password } );
    if(role === Role.DOCTOR) return axios.post('/auth/login/doctor', { nhsNumber, password } );
    return axios.post('/auth/login/receptionist', { nhsNumber, password } ); 
  }
}

export default new AuthService();