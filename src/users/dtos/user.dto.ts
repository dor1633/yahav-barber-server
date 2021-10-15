import { IsString, IsOptional, IsPhoneNumber, IsBoolean, IsObject } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class User {
  @IsString()
  @ApiProperty()
  name: string;

  @IsString()
  @IsPhoneNumber('IL')
  @ApiProperty()
  phoneNumber: string;
}
