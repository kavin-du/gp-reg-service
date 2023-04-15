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
    TypeOrmModule.forFeature([User, Appointment], dbType.SURGERY_DB),
    TypeOrmModule.forFeature([Patient], dbType.CENTRAL_HEALTH_DB),
  ],
  controllers: [UsersController],
  providers: [UsersService, AppointmentsService],
  exports: [UsersService]
})
export class UsersModule {}
