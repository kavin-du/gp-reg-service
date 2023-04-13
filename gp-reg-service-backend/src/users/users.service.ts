import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from 'src/roles/role.enum';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>
  ) {}

  async create(createUserDto: CreateUserDto) {
    const oldUser = await this.findByEmail(createUserDto.email);
    if(oldUser) {
      throw new ConflictException('User already exists.');
    }
    const newuser = this.userRepository.create({
      ...createUserDto,
      createdAt: new Date(),
      roles: [Role.User]
    });
    return this.userRepository.save(newuser);
  }

  findAll() {
    return this.userRepository.find();
  }

  findOne(id: number) {
    return this.userRepository.findOneBy({ id });
  }
  
  findByEmail(email: string) {
    return this.userRepository.findOneBy({ email });
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return this.userRepository.update(id, { ...updateUserDto });
  }

  remove(id: number) {
    return this.userRepository.delete(id);
  }
}
