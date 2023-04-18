import { TokenData } from './../utils/types';
import axios from "axios";

class AppointmentService {
  private readonly userData: TokenData = JSON.parse(localStorage.getItem('user') as string);
  
  getForUser() {
    console.log(this.userData);
    const { sub: id } = this.userData;
    return axios.get(`/users/${id}/appointments`);
  }
}

export default new AppointmentService();