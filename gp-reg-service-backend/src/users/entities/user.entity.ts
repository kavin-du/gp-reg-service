import { Role } from './../../roles/role.enum';
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  nhsNumber: string;

  @Column({ nullable: true })
  firstname: string;

  @Column({ nullable: true })
  surname: string;

  @Column({ nullable: true })
  postalCode: string;

  @Column()
  password: string;

  @Column()
  createdAt: Date;

  @Column({ type: 'simple-array'})
  roles: Role[];
}
