import { Receptionist } from './entities/receptionist.entity';
import { Doctor } from './entities/doctor.entity';
import { VaccinesService } from './../vaccines/vaccines.service';
import { Vaccine } from './../vaccines/entities/vaccine.entity';
import { Patient } from './entities/patient.entity';
import { AppointmentsService } from './../appointments/appointments.service';
import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Appointment } from 'src/appointments/entities/appointment.entity';
import { dbType } from 'src/utils/constants';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Appointment, Doctor, Receptionist], dbType.SURGERY_DB),
    TypeOrmModule.forFeature([Patient, Vaccine], dbType.CENTRAL_HEALTH_DB),
  ],
  controllers: [UsersController],
  providers: [UsersService, AppointmentsService, VaccinesService],
  exports: [UsersService]
})
export class UsersModule {}
