import config from './orm.config';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { AppointmentsModule } from './appointments/appointments.module';
import { VaccinesModule } from './vaccines/vaccines.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot(config.surgery_db),
    TypeOrmModule.forRoot(config.central_health_db),
    UsersModule,
    AuthModule,
    AppointmentsModule,
    VaccinesModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
