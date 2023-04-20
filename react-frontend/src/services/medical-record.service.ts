import { getUserId } from './../utils/getUserId';
import axios from "axios";

class MedicalRecordService {
  
  get() {
    const id = getUserId();
    return axios.get(`/users/${id}/medical-records`);
  }
}

export default new MedicalRecordService();