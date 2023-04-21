import { getUser } from '../utils/getUser';
import axios from "axios";

class AppointmentService {
  
  getForUser() {
    const {sub: id} = getUser();
    return axios.get(`/users/${id}/appointments`);
  }

  getAll() {
    return axios.get(`/appointments`);
  }

  create(reason: string) {
    const {sub: id} = getUser();
    return axios.post(`/users/${id}/appointments`, { reason });
  }

  delete(appId: number) {
    const {sub: id} = getUser();
    return axios.delete(`/users/${id}/appointments/${appId}`);
  }

}

export default new AppointmentService();