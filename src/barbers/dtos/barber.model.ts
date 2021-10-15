import { IsString, IsOptional, IsPhoneNumber, IsObject, IsNumber } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
import { AvailabilityPerDate } from "./availabilityPerDate.dto";

export class Barber {
  @IsString()
  @ApiProperty()
  name: string;

  @IsString()
  @IsPhoneNumber('IL')
  @ApiProperty()
  phoneNumber: string;

  @IsObject()
  @IsOptional()
  schedule?: AvailabilityPerDate;

  @IsNumber()
  @ApiProperty()
  appointmentTime: number;
}
