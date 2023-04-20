import { UsersModule } from './../users/users.module';
import { User } from './../users/entities/user.entity';
import { UsersService } from './../users/users.service';
import { Vaccine } from './entities/vaccine.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { VaccinesService } from './vaccines.service';
import { VaccinesController } from './vaccines.controller';
import { dbType } from 'src/utils/constants';

@Module({
  imports: [
    TypeOrmModule.forFeature([Vaccine], dbType.CENTRAL_HEALTH_DB),
    UsersModule
  ],
  controllers: [VaccinesController],
  providers: [VaccinesService],
  exports: [VaccinesService],
})
export class VaccinesModule {}
