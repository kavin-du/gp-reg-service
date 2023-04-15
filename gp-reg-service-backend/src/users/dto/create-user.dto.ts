import { Type } from "class-transformer";
import { IsDate, IsDefined, IsNotEmpty, IsNumberString, Length } from "class-validator";

export class CreateUserDto {

  @IsDefined()
  @IsNumberString()
  @Length(11, 11)
  nhsNumber: string;

  @IsDefined() @IsNotEmpty()
  password: string;
}
