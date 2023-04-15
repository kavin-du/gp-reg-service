import { UsersService } from './../users/users.service';
import { Appointment } from './entities/appointment.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { Repository } from 'typeorm';
import { dbType } from 'src/utils/constants';

@Injectable()
export class AppointmentsService {
  constructor(
    @InjectRepository(Appointment, dbType.SURGERY_DB) private readonly appointmentRepo: Repository<Appointment>,
    private readonly userService: UsersService,
  ){}

  async create(id: number, createAppointmentDto: CreateAppointmentDto) {
    const user = await this.userService.findUserById(id);
    const newAppointment = this.appointmentRepo.create({
      ...createAppointmentDto,
      createdAt: new Date(),
      user
    })
    return this.appointmentRepo.save(newAppointment);
  }

  async findByUser(id: number) {
    const _user = await this.userService.findUserById(id);
    return this.appointmentRepo.find({
      where: {
        user: { id }
      }
    });
  }

  async cancelByUser(userid: number, appid: number) {
    const _user = await this.userService.findUserById(userid);
    return this.appointmentRepo.delete({ id: appid })
  }

}
