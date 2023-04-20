export type AppointmentType = {
  id: number;
  reason: string;
  createdAt: string;
}

export type VaccinationRecordType =  {
  DoseNo: number;
  NHSNumber: number;
  VaccinationDate: string;
  VaccineManufacturer: string;
  DiseaseTargeted: string;
  VaccineType: string;
  Product: string;
  VaccineBatchNumber: string;
  CountryOfVaccination: string;
  Authority: string;
  Site: string;
  TotalSeriesOfDoses: number;
  DisplayName: string;
  SnomedCode: number;
  DateEntered: string;
  ProcedureCode: number;
  Booster: boolean;
}

export type TokenData = {
  nhsNumber: string;
  sub: number;
  roles: string[];
  iat: number;
  exp: number;
}

export type ListStateType = {
  entities: [];
  status: 'idle' | 'pending' | 'failed';
}