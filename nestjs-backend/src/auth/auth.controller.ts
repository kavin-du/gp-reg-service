import { RolesGuard } from './../roles/roles.guard';
import { AuthGuard } from './auth.guard';
import { Controller, HttpCode, HttpStatus, Post, Body, Get, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDto } from './dto/signin.dto';
import { Roles } from 'src/roles/roles.decorator';
import { Role } from 'src/roles/role.enum';
import { SkipAuth } from './skipauth.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @SkipAuth() // skip jwt auth
  @HttpCode(HttpStatus.OK)
  @Post('login/patient')
  signInPatient(@Body() signInDto: SignInDto) {
    return this.authService.signIn(signInDto.nhsNumber, signInDto.password, Role.Patient);
  }

  @SkipAuth() 
  @HttpCode(HttpStatus.OK)
  @Post('login/doctor')
  signInDoctor(@Body() signInDto: SignInDto) {
    return this.authService.signIn(signInDto.nhsNumber, signInDto.password, Role.Doctor);
  }

  @SkipAuth() 
  @HttpCode(HttpStatus.OK)
  @Post('login/receptionist')
  signInReceptionist(@Body() signInDto: SignInDto) {
    return this.authService.signIn(signInDto.nhsNumber, signInDto.password, Role.Admin);
  }

  @Get('profile')
  @Roles(Role.Admin)
  getProfile(@Request() req) {
    return req.user;
  }
}
