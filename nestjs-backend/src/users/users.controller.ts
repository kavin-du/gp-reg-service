import { CreateDoctorDto } from './dto/create-doctor.dto';
import { VaccinesService } from './../vaccines/vaccines.service';
import { UpdateAppointmentDto } from './../appointments/dto/update-appointment.dto';
import { AppointmentsService } from './../appointments/appointments.service';
import { CreateAppointmentDto } from './../appointments/dto/create-appointment.dto';
import { SkipAuth } from './../auth/skipauth.decorator';
import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, Request, Req, Res, UseInterceptors, ClassSerializerInterceptor } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Response } from 'express';
import { Role } from 'src/roles/role.enum';

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly appointmentsService: AppointmentsService,
    private readonly vaccineService: VaccinesService,
  ) { }

  @SkipAuth()
  @UseInterceptors(ClassSerializerInterceptor)
  @Post('patient')
  createPatient(@Body() createUserDto: CreateUserDto) {
    return this.usersService.createPatient(createUserDto);
  }

  @SkipAuth()
  @UseInterceptors(ClassSerializerInterceptor)
  @Post('receptionist')
  createReceptionist(@Body() createRecepDto: CreateDoctorDto) {
    return this.usersService.createDoctor(createRecepDto, Role.Receptionist);
  }

  @SkipAuth()
  @UseInterceptors(ClassSerializerInterceptor)
  @Post('doctor')
  createDoctor(@Body() createDocDto: CreateDoctorDto) {
    return this.usersService.createDoctor(createDocDto, Role.Doctor);
  }


  @UseInterceptors(ClassSerializerInterceptor)
  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number, @Request() req, @Res() response: Response) {
    await this.usersService.remove(+id, req.user);
    return response.status(204).json({
      message: 'User deleted successfully'
    })
  }

  // ===== APPOINTMENTS =====

  @Get(':id/appointments')
  getAppointments(@Param('id', ParseIntPipe) id: number) {
    return this.appointmentsService.findManyByUser(id);
  }

  @Post(':id/appointments')
  createAppointment(@Param('id', ParseIntPipe) id: number, @Body() createAppointmentDto: CreateAppointmentDto) {
    return this.appointmentsService.create(id, createAppointmentDto);
  }

  @Patch(':userId/appointments/:appointmentId')
  updateAppointment(
    @Param('userId', ParseIntPipe) userId: number, 
    @Param('appointmentId', ParseIntPipe) appointmentId: number,
    @Body() updateAppointmentDto: UpdateAppointmentDto,
  ) {
    return this.appointmentsService.updateByUser(userId, appointmentId, updateAppointmentDto);
  }

  @Delete(':userId/appointments/:appointmentId')
  cancelAppointment(
    @Param('userId', ParseIntPipe) userId: number, 
    @Param('appointmentId', ParseIntPipe) appointmentId: number,
  ) {
    return this.appointmentsService.cancelByUser(userId, appointmentId);
  }

  // ===== MEDICAL RECORDS =====

  @Get(':id/medical-records')
  getMedicalRecords(@Param('id', ParseIntPipe) id: number) {
    return this.vaccineService.findManyByUser(id);
  }

}
