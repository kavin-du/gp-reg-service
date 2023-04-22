import { Appointment } from './../../appointments/entities/appointment.entity';
import { Role } from './../../roles/role.enum';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Exclude } from 'class-transformer';

@Entity({ name: 'users' })
export class User {
  /*
    This class maps the central health db user to surgery db
  */

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  nhsNumber: string;

  @Column()
  firstname: string;

  @Column()
  surname: string;

  @Column()
  dateOfBirth: Date;

  @Column()
  genderCode: string;

  @Column()
  postalCode: string;

  @Column() @Exclude()
  password: string;

  @Column()
  createdAt: Date;

  @Column({ type: 'simple-array'})
  roles: Role[];

  @OneToMany(() => Appointment, (appointment) => appointment.user)
  appointments: Appointment[]
}
