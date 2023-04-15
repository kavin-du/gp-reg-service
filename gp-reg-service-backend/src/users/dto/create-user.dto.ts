import { Type } from "class-transformer";
import { IsDate, IsDefined, IsNotEmpty, IsNumberString, Length } from "class-validator";

export class CreateUserDto {

  @IsDefined()
  @IsNumberString()
  @Length(10, 10)
  nhsNumber: string;

  @IsDefined() @IsNotEmpty()
  firstname: string;

  @IsDefined() @IsNotEmpty()
  surname: string;

  @IsDefined() 
  @IsDate()
  @Type(() => Date)
  dateOfBirth: Date;

  @IsDefined() @IsNotEmpty()
  genderCode: string;

  @IsDefined() @IsNotEmpty()
  postalCode: string;

  @IsDefined() @IsNotEmpty()
  password: string;
}
