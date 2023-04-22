import { Role } from 'src/roles/role.enum';
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

  async signIn(nhsNumber: string, pass: string, role: Role): Promise<any> {
    const user = await this.usersService.findByNHS(nhsNumber, role);

    if(!user) {
      throw new UnauthorizedException('Invalid username or password!');
    }
    const isPasswordValid = await bcrypt.compare(pass, user?.password);
    if(!isPasswordValid) {
      throw new UnauthorizedException('Invalid username or password!');
    }
    const { firstname, surname, id, roles } = user;
    const payload: jwtPayload = { name: `${firstname} ${surname}`, sub: id, roles };
    const access_token = await this.jwtService.signAsync(payload);
    return { access_token };
  }
}
