import { AppointmentsService } from './../appointments/appointments.service';
import { CreateAppointmentDto } from './../appointments/dto/create-appointment.dto';
import { SkipAuth } from './../auth/skipauth.decorator';
import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, Request, Req, Res } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Response } from 'express';

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly appointmentsService: AppointmentsService,
  ) {}

  @SkipAuth()
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Post(':id/appointments')
  createAppointment(@Param('id', ParseIntPipe) id: number, @Body() createAppointmentDto: CreateAppointmentDto) {
    return this.appointmentsService.create(id, createAppointmentDto);
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  // @Get(':id')
  // findOne(@Param('id', ParseIntPipe) id: number) {
  //   return this.usersService.findOne(+id);
  // }

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
}
