import { UsersModule } from './../users/users.module';
import { Appointment } from './entities/appointment.entity';
import { User } from './../users/entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { AppointmentsService } from './appointments.service';
import { AppointmentsController } from './appointments.controller';
import { dbType } from 'src/utils/constants';

@Module({
  imports: [
    TypeOrmModule.forFeature([Appointment], dbType.SURGERY_DB),
    UsersModule
  ],
  controllers: [AppointmentsController],
  providers: [AppointmentsService],
  exports: [AppointmentsService],
})
export class AppointmentsModule { }
