import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";
import { ApiProperty, ApiResponseProperty } from "@nestjs/swagger";
import { IsArray, IsString } from "class-validator";

import { Document } from "mongoose";
import { BasicEntityDto } from "../common/basicEntity.dto";
import * as mongoose from "mongoose";
interface INotification {}
export class UserDto extends BasicEntityDto {
  @ApiResponseProperty()
  _id: string;

  @ApiProperty()
  @IsString()
  email: string;

  @ApiProperty()
  @IsString()
  username: string;

  @ApiProperty()
  @IsString()
  password: string;

  @ApiProperty()
  @IsString()
  fullName: string;

  @ApiProperty()
  @IsString()
  image: string;

  @ApiProperty()
  @IsArray()
  recommendedChallenges: string[];

  @ApiProperty()
  @IsArray()
  acceptedChallenges: string[];

  @ApiResponseProperty()
  totalScore: number;
}

@Schema()
export class User extends Document {
  @Prop()
  email: string;

  @Prop()
  username: string;

  @Prop()
  password: string;

  @Prop()
  fullName: string;

  @Prop()
  image: string;

  @Prop({ default: [] })
  pushTokens: string[];

  @Prop()
  recommendedChallenges: string[];

  @Prop()
  acceptedChallenges: string[];

  @Prop({ default: 0 })
  totalScore: number;
}

export const UserSchema = SchemaFactory.createForClass(User);
