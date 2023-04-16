import { Vaccine } from './entities/vaccine.entity';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { dbType } from 'src/utils/constants';

@Injectable()
export class VaccinesService {

  constructor(
    @InjectRepository(Vaccine, dbType.CENTRAL_HEALTH_DB) private readonly vaccineRepo: Repository<Vaccine>,
  ){}

  findAll() {
    return this.vaccineRepo.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} vaccine`;
  }

}
