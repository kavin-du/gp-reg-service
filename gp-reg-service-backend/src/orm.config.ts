import { DataSourceOptions } from "typeorm";
import { Appointment } from "./appointments/entities/appointment.entity";
import { User } from "./users/entities/user.entity";
require('dotenv').config()

const config: Record<string, DataSourceOptions> = {
  surgery_db: {
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: `${process.env.MYSQL_USERNAME}`,
    password: `${process.env.MYSQL_PW}`,
    database: 'my_db',
    entities: [User, Appointment],
    synchronize: true,
  },
  central_health_db: {
    type: 'sqlite',
    database: 'vaccines.db',
    entities: [User, Appointment],
    synchronize: false,
  },
} 

export default config;