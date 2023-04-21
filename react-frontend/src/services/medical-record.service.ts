import { getUser } from '../utils/getUser';
import axios from "axios";

class MedicalRecordService {
  
  get() {
    const {sub: id} = getUser();
    return axios.get(`/users/${id}/medical-records`);
  }
}

export default new MedicalRecordService();