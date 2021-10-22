import { IsString, IsOptional, IsPhoneNumber, IsObject, IsNumber } from "class-validator";
import { ApiProperty, ApiResponseProperty } from "@nestjs/swagger";
import { AvailabilityPerDate } from "./availabilityPerDate.dto";

export class Barber {
  @ApiResponseProperty()
  _id?: string;

  @IsString()
  @ApiProperty()
  name: string;

  @IsString()
  @IsPhoneNumber('IL')
  @ApiProperty()
  phoneNumber: string;

  @IsObject()
  @IsOptional()
  @ApiResponseProperty()
  availability?: AvailabilityPerDate;

  @IsNumber()
  @ApiProperty()
  appointmentMinutes: number;
}
