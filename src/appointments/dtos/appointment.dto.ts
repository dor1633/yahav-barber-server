import { IsString } from "class-validator";
import { ApiProperty, ApiResponseProperty } from "@nestjs/swagger";

export class Appointment {
  @ApiResponseProperty()
  _id?: string;

  @IsString()
  @ApiProperty()
  barberId: string;

  @IsString()
  @ApiProperty()
  clientId: string;

  @IsString()
  @ApiProperty()
  date: string;

  @IsString()
  @ApiProperty()
  timeRange: string;
}
