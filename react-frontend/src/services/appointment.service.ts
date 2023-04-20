import { getUserId } from './../utils/getUserId';
import axios from "axios";

class AppointmentService {
  
  getForUser() {
    const id = getUserId();
    return axios.get(`/users/${id}/appointments`);
  }

  create(reason: string) {
    const id = getUserId();
    return axios.post(`/users/${id}/appointments`, { reason });
  }

  delete(appId: number) {
    const id = getUserId();
    return axios.delete(`/users/${id}/appointments/${appId}`);
  }

}

export default new AppointmentService();