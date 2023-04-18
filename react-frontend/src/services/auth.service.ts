import axios from "axios";

class AuthService {
  
  login(nhsNumber: string, password: string) {
    return axios.post('/auth/login', { nhsNumber, password } );
  }
}

export default new AuthService();