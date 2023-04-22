import { Role } from './../../roles/role.enum';
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { Exclude } from 'class-transformer';

@Entity({ name: 'doctors' })
export class Doctor {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  nhsNumber: string;

  @Column()
  firstname: string;

  @Column()
  surname: string;

  @Column() @Exclude()
  password: string;

  @Column()
  createdAt: Date;

  @Column({ type: 'simple-array'})
  roles: Role[];
}
