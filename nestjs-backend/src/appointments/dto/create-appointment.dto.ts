import { IsDefined, IsNotEmpty } from 'class-validator';
export class CreateAppointmentDto {
  
  @IsDefined()
  @IsNotEmpty()
  reason: string;
}
