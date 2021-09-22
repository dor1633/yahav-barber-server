import { ApiProperty } from "@nestjs/swagger";

export class AvailabilityPerDate {
  [date: string]: string[]
}
