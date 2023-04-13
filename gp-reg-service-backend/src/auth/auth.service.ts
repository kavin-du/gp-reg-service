import { UsersService } from './../users/users.service';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService, 
    private jwtService: JwtService
  ) {}

  async signIn(email: string, pass: string): Promise<any> {
    const user = await this.usersService.findByEmail(email);
    if(user?.password !== pass) {
      throw new UnauthorizedException();
    }
    const payload = { email, sub: user.id };
    const access_token = await this.jwtService.signAsync(payload);
    console.log(access_token);
    
    return { access_token };
  }
}
