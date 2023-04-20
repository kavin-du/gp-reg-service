import { TokenData } from './../utils/types';
import axios from "axios";

class MedicalRecordService {
  private readonly userData: TokenData = JSON.parse(localStorage.getItem('user') as string);
  
  get() {
    const { sub: id } = this.userData;
    return axios.get(`/users/${id}/medical-records`);
  }
}

const medicalReordsService = new MedicalRecordService();
export default medicalReordsService;