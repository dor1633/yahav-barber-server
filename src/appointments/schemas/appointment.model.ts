import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

export interface SavedAppointment {
  barberId: string;
  gettingHaircutId: string;
  from: number;
  to: number;
}

@Schema()
export class Appointment extends Document {
  @Prop({ required: true })
  barberId: string;

  @Prop({ required: true })
  gettingHaircutId: string;

  @Prop({ required: true })
  from: number;

  @Prop({ required: true })
  to: number;
}

export const AppointmentSchema = SchemaFactory.createForClass(Appointment);