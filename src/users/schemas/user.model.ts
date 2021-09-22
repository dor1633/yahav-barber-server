import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
import { AvailabilityPerDate } from "./availabilityPerDate.model";

@Schema()
export class User extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  phoneNumber: string;

  @Prop({ required: true })
  isBarber: boolean;

  @Prop()
  availabilityPerDate?: AvailabilityPerDate;
}

export const UserSchema = SchemaFactory.createForClass(User);
