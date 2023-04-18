import { TokenData } from './../utils/types';
import axios from "axios";

class AppointmentService {
  private readonly userData: TokenData = JSON.parse(localStorage.getItem('user') as string);
  
  getForUser() {
    const { sub: id } = this.userData;
    return axios.get(`/users/${id}/appointments`);
  }

  create(reason: string) {
    const { sub: id } = this.userData;
    return axios.post(`/users/${id}/appointments`, { reason });
  }

}

export default new AppointmentService();