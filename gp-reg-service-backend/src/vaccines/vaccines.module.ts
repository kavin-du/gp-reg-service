import { Vaccine } from './entities/vaccine.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { VaccinesService } from './vaccines.service';
import { VaccinesController } from './vaccines.controller';
import { dbType } from 'src/utils/constants';

@Module({
  imports: [TypeOrmModule.forFeature([Vaccine], dbType.CENTRAL_HEALTH_DB)],
  controllers: [VaccinesController],
  providers: [VaccinesService],
  exports: [VaccinesService],
})
export class VaccinesModule {}
