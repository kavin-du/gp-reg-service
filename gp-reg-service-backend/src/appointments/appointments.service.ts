import { UsersService } from './../users/users.service';
import { User } from './../users/entities/user.entity';
import { Appointment } from './entities/appointment.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { Repository } from 'typeorm';

@Injectable()
export class AppointmentsService {
  constructor(
    @InjectRepository(Appointment) private readonly appointmentRepo: Repository<Appointment>,
    @InjectRepository(User) private readonly userRepo: Repository<User>,
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
