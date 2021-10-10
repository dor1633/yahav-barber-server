import { IsString } from "class-validator";
import { ApiProperty, ApiResponseProperty } from "@nestjs/swagger";

export interface AppointmentDetails {
    timeRange: string;
    clientId: string;
    clientName: string;
}

export class Schedule {
    [date: string]: AppointmentDetails[]
}
