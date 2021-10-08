import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

@Schema()
export class Appointment extends Document {
  @Prop({ required: true })
  barberId: string;

  @Prop({ required: true })
  gettingHaircutId: string;

  @Prop({ required: true })
  timeRange: string;
}

export const AppointmentSchema = SchemaFactory.createForClass(Appointment);
