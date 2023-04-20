import { Vaccine } from './../../vaccines/entities/vaccine.entity';
import { Column, Entity, OneToMany, PrimaryColumn } from "typeorm";

@Entity({ name: 'patients' })
export class Patient {
  
  @PrimaryColumn()
  NHSNumber: number;

  @Column()
  Forename: string;

  @Column()
  Surname: string;

  @Column()
  PersonDOB: Date;

  @Column()
  GenderCode: string;

  @Column()
  Postcode: string;

  @OneToMany(() => Vaccine, (vaccine) => vaccine.patient)
  vaccines: Vaccine[]
}
