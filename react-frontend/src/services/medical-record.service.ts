import { getUser } from '../utils/helpers';
import axios from "axios";

class MedicalRecordService {
  
  getUser() {
    const {sub: id} = getUser();
    return axios.get(`/users/${id}/medical-records`);
  }
  getAll() {
    return axios.get(`/medical-records`);
  }
}

export default new MedicalRecordService();