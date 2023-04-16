import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import { Patient } from "./patient.entity";

@Entity({ name: 'vaccines' })
export class Vaccine {
  
  @PrimaryColumn({ type: 'int', name: 'NHSNumber' })
  @ManyToOne(() => Patient, (patient) => patient.vaccines)
  @JoinColumn({ name: 'NHSNumber' })
  patient: Patient;

  @PrimaryColumn()
  DoseNo: number;

  @Column()
  NHSNumber: number;

  @Column()
  VaccinationDate: Date;
  
  @Column()
  VaccineManufacturer: string;
  
  @Column()
  DiseaseTargeted: string;
  
  @Column()
  VaccineType: string;
  
  @Column()
  Product: string;
  
  @Column()
  VaccineBatchNumber: string;
  
  @Column()
  CountryOfVaccination: string;
  
  @Column()
  Authority: string;
  
  @Column()
  Site: string;
  
  @Column()
  TotalSeriesOfDoses: number;
  
  @Column()
  DisplayName: string;
  
  @Column()
  SnomedCode: number;
  
  @Column()
  DateEntered: Date;
  
  @Column()
  ProcedureCode: number;
  
  @Column()
  Booster: boolean;
  
}
