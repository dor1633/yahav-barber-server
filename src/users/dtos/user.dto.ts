import { IsString, IsOptional, IsPhoneNumber, IsBoolean, IsObject } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
import { AvailabilityPerDate } from "./availabilityPerDate.dto";

export class User {
  @IsString()
  @ApiProperty()
  name: string;

  @IsString()
  @IsPhoneNumber('IL')
  @ApiProperty()
  phoneNumber: string;

  @IsBoolean()
  @ApiProperty({ default: false })
  isBarber: boolean;

  @IsObject()
  @IsOptional()
  schedule?: AvailabilityPerDate;
}
