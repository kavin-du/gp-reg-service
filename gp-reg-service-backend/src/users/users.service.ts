import { jwtPayload } from './../utils/types';
import { ConflictException, Injectable, UnauthorizedException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from 'src/roles/role.enum';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>
  ) {}

  async create(createUserDto: CreateUserDto) {
    const oldUser = await this.findByNHS(createUserDto.nhsNumber);
    if(oldUser) {
      throw new ConflictException('User already exists.');
    }
    const hashedPw = await bcrypt.hash(createUserDto.password, 10);

    const newuser = this.userRepository.create({
      ...createUserDto,
      password: hashedPw,
      createdAt: new Date(),
      roles: [Role.User]
    });
    const { password, ...user } = await this.userRepository.save(newuser);
    return user;
  }

  findAll() {
    return this.userRepository.find();
  }

  async findUserById(id: number) {
    const user = await this.userRepository.findOneBy({ id });
    if(!user) {
      throw new NotFoundException('User does not exist!');
    }
    return user;
  }
  
  findByNHS(nhsNumber: string) {
    return this.userRepository.findOneBy({ nhsNumber });
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return this.userRepository.update(id, { ...updateUserDto });
  }

  async remove(id: number, user: jwtPayload) {
    if(user.sub !== id) {
      throw new UnauthorizedException('You are not allowed to delete other users!');
    }
    return await this.userRepository.delete(id);
  }
}
