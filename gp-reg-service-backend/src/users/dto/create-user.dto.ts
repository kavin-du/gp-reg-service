import { IsDefined, IsNotEmpty, IsNumberString, IsOptional, Length } from "class-validator";

export class CreateUserDto {

  @IsDefined()
  @IsNumberString()
  @Length(10, 10)
  nhsNumber: string;

  firstname: string;
  surname: string;
  postalCode: string;

  @IsDefined()
  @IsNotEmpty()
  password: string;
}
