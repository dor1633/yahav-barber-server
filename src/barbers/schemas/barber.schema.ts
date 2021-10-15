import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
import { BarberSchedule } from "./barberSchedule.schema";

@Schema()
export class Barber extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  phoneNumber: string;

  @Prop()
  schedule?: BarberSchedule;
}

export const BarberSchema = SchemaFactory.createForClass(Barber);
