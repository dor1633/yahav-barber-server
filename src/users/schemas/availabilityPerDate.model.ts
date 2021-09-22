import { Schema } from "@nestjs/mongoose";

@Schema()
export class AvailabilityPerDate {
  [date: string]: string[]
}
