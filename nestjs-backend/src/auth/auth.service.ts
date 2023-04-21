import { jwtPayload } from './../utils/types';
import { UsersService } from './../users/users.service';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService, 
    private jwtService: JwtService
  ) {}

  async signIn(nhsNumber: string, pass: string): Promise<any> {
    const user = await this.usersService.findByNHS(nhsNumber);
    if(!user) {
      throw new UnauthorizedException('Invalid username or password!');
    }
    const isPasswordValid = await bcrypt.compare(pass, user?.password);
    if(!isPasswordValid) {
      throw new UnauthorizedException('Invalid username or password!');
    }
    const payload: jwtPayload = { sub: user.id, roles: user.roles };
    const access_token = await this.jwtService.signAsync(payload);
    return { access_token };
  }
}
