import { Vaccine } from './entities/vaccine.entity';
import { Patient } from './entities/patient.entity';
import { jwtPayload } from './../utils/types';
import { ConflictException, Injectable, UnauthorizedException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from 'src/roles/role.enum';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';
import { dbType } from 'src/utils/constants';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User, dbType.SURGERY_DB) private readonly userRepository: Repository<User>,
    @InjectRepository(Patient, dbType.CENTRAL_HEALTH_DB) private readonly patientRepo: Repository<Patient>,
    @InjectRepository(Vaccine, dbType.CENTRAL_HEALTH_DB) private readonly vaccineRepo: Repository<Vaccine>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    // user from the surgery db
    const oldUser = await this.findByNHS(createUserDto.nhsNumber);
    if(oldUser) {
      throw new ConflictException('User already exists.');
    }
    // user record from the central health db
    const oldRecord = await this.patientRepo.findOneBy({ NHSNumber: createUserDto.nhsNumber as unknown as number});
    if(!oldRecord) {
      const msg = 'We don\'t have a medical record matching with your NHS number!';
      throw new NotFoundException(msg);
    }
    const hashedPw = await bcrypt.hash(createUserDto.password, 10);

    const newuser = this.userRepository.create({
      ...createUserDto,
      firstname: oldRecord.Forename,
      surname: oldRecord.Surname,
      dateOfBirth: oldRecord.PersonDOB,
      genderCode: oldRecord.GenderCode,
      postalCode: oldRecord.Postcode,
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
