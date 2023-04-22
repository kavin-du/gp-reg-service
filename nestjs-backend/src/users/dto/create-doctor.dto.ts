import { IsDefined, IsNotEmpty, IsNumberString, Length } from "class-validator";

export class CreateDoctorDto {

  @IsDefined()
  @IsNumberString()
  @Length(11, 11)
  nhsNumber: string;

  @IsDefined() @IsNotEmpty()
  firstname: string;

  @IsDefined() @IsNotEmpty()
  surname: string;

  @IsDefined() @IsNotEmpty()
  password: string;
}
