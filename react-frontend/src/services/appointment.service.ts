import { getUser } from '../utils/helpers';
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

  update(appId: number, reason: string) {
    const {sub: id} = getUser();
    return axios.patch(`/users/${id}/appointments/${appId}`, { reason });
  }
}

export default new AppointmentService();