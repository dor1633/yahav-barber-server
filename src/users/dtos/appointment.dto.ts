import { IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class Appointment {
  @IsString()
  @ApiProperty()
  barberId: string;

  @IsString()
  @ApiProperty()
  gettingHaircutId: string;

  @IsString()
  timeRange: string;
}
