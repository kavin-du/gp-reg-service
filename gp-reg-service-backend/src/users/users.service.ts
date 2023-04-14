import { ConflictException, Injectable } from '@nestjs/common';
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
    @InjectRepository(User) private userRepository: Repository<User>
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

  findOne(id: number) {
    return this.userRepository.findOneBy({ id });
  }
  
  findByNHS(nhsNumber: string) {
    return this.userRepository.findOneBy({ nhsNumber });
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return this.userRepository.update(id, { ...updateUserDto });
  }

  remove(id: number) {
    return this.userRepository.delete(id);
  }
}
