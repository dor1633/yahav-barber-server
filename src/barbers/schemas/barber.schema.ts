import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
import { BarberAvailability } from "./barberSchedule.schema";

@Schema()
export class Barber extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  phoneNumber: string;

  @Prop({ default: {} })
  availability?: BarberAvailability;

  @Prop()
  appointmentMinutes: number;
}

export const BarberSchema = SchemaFactory.createForClass(Barber);
