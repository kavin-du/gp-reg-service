import { UpdateAppointmentDto } from './dto/update-appointment.dto';
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

  async findManyByUser(id: number) {
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

  async findOne(id: number) {
    const app = await this.appointmentRepo.findOneBy({ id });
    if(!app) {
      throw new NotFoundException('Appointment not found!');
    }
    return app;
  }

  async updateByUser(userid: number, appid: number, updateAppointmentDto: UpdateAppointmentDto) {
    const _user = await this.userService.findUserById(userid);
    const _app = await this.findOne(appid);
    return this.appointmentRepo.update(appid, { ...updateAppointmentDto })
  }

  findAll() {
    return this.appointmentRepo.find({
      relations: ['user'],
      select: {
        user: {
          // list of necessary attributes of user relation
          firstname: true,
          surname: true,
          nhsNumber: true,
        },
      },
    });
  }

}
