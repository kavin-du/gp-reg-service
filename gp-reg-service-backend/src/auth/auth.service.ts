import { UsersService } from './../users/users.service';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService, 
    private jwtService: JwtService
  ) {}

  async signIn(nhsNumber: string, pass: string): Promise<any> {
    const user = await this.usersService.findByNHS(nhsNumber);
    if(user?.password !== pass) {
      throw new UnauthorizedException();
    }
    const payload = { nhsNumber, sub: user.id, roles: user.roles };
    const access_token = await this.jwtService.signAsync(payload);
    return { access_token };
  }
}
