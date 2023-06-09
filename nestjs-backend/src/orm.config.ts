import { Receptionist } from './users/entities/receptionist.entity';
import { Doctor } from './users/entities/doctor.entity';
import { Vaccine } from './vaccines/entities/vaccine.entity';
import { Patient } from './users/entities/patient.entity';
import { DataSourceOptions } from "typeorm";
import { Appointment } from "./appointments/entities/appointment.entity";
import { User } from "./users/entities/user.entity";
import { dbType } from './utils/constants';
require('dotenv').config()

const config: Record<string, DataSourceOptions> = {
  surgery_db: {
    name: dbType.SURGERY_DB,
    type: 'mysql',
    host: `${process.env.MYSQL_HOST}`,
    port: parseInt(`${process.env.MYSQL_PORT}`),
    username: `${process.env.MYSQL_USERNAME}`,
    password: `${process.env.MYSQL_PW}`,
    database: 'my_db',
    entities: [User, Appointment, Doctor, Receptionist],
    synchronize: true,
  },
  central_health_db: {
    name: dbType.CENTRAL_HEALTH_DB,
    type: 'sqlite',
    database: 'vaccines.db',
    entities: [Patient, Vaccine],
    synchronize: false,
  },
} 

export default config;