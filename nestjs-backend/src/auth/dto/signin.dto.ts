import { Type } from "class-transformer";
import { IsDefined, IsNotEmpty, IsNumberString, Length } from "class-validator";

export class SignInDto {

  @IsDefined()
  @IsNumberString()
  @Length(11, 11)
  nhsNumber: string;

  @IsDefined() @IsNotEmpty()
  password: string;
}