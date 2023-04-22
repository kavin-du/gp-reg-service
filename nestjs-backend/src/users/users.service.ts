import { Receptionist } from './entities/receptionist.entity';
import { Doctor } from './entities/doctor.entity';
import { CreateDoctorDto } from './dto/create-doctor.dto';
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
    @InjectRepository(Doctor, dbType.SURGERY_DB) private readonly docRepo: Repository<Doctor>,
    @InjectRepository(Receptionist, dbType.SURGERY_DB) private readonly recepRepo: Repository<Receptionist>,
    @InjectRepository(Patient, dbType.CENTRAL_HEALTH_DB) private readonly patientRepo: Repository<Patient>,
  ) {}

  async createPatient(createUserDto: CreateUserDto) {
    // user from the surgery db
    const oldUser = await this.findByNHS(createUserDto.nhsNumber, Role.Patient);
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
      roles: [Role.Patient]
    });
    return this.userRepository.save(newuser);
  }

  async createDoctor(createDocDto: CreateDoctorDto, role: Role) {
    const oldUser = await this.findByNHS(createDocDto.nhsNumber, role);
    if(oldUser) {
      throw new ConflictException('User already exists.');
    }
    const hashedPw = await bcrypt.hash(createDocDto.password, 10);

    if(role === Role.Doctor) {
      const newuser = this.docRepo.create({
        ...createDocDto,
        password: hashedPw,
        createdAt: new Date(),
        roles: [role]
      });
      return this.docRepo.save(newuser);
    }

    const newuser = this.recepRepo.create({
      ...createDocDto,
      password: hashedPw,
      createdAt: new Date(),
      roles: [role]
    });
    return this.recepRepo.save(newuser);


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
  
  findByNHS(nhsNumber: string, role: Role) {
    if(role === Role.Patient) return this.userRepository.findOneBy({ nhsNumber });
    if(role === Role.Doctor) return this.docRepo.findOneBy({ nhsNumber });
    if(role === Role.Admin) return this.recepRepo.findOneBy({ nhsNumber });
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
