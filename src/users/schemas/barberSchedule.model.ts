import { Schema } from "@nestjs/mongoose";

export class TimeRange {
  from: number;
  to: number;
}

@Schema()
export class BarberSchedule {
  [date: string]: TimeRange[]
}
