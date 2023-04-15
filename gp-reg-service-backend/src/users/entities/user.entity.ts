import { Appointment } from './../../appointments/entities/appointment.entity';
import { Role } from './../../roles/role.enum';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'users' })
export class User {
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

  @Column()
  password: string;

  @Column()
  createdAt: Date;

  @Column({ type: 'simple-array'})
  roles: Role[];

  @OneToMany(() => Appointment, (appointment) => appointment.user)
  appointments: Appointment[]
}
