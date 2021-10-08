import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
import { BarberSchedule } from "./barberSchedule.model";

@Schema()
export class User extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  phoneNumber: string;

  @Prop({ required: true })
  isBarber: boolean;

  @Prop()
  schedule?: BarberSchedule;
}

export const UserSchema = SchemaFactory.createForClass(User);
