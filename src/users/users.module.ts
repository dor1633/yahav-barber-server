import { Module } from "@nestjs/common";
import { UsersRepository } from "./users.repository";
import { UserController } from "./users.controller";
import { MongooseModule } from "@nestjs/mongoose";
import { User, UserSchema } from "./schemas/user.model";
import { UsersValidator } from "./users.validator";
import { UsersHelper } from "./users.helper.";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  controllers: [UserController],
  providers: [UsersRepository, UsersValidator, UsersHelper],
  exports: [
    UsersRepository,
    UsersValidator
  ],
})
export class UsersModule { }
