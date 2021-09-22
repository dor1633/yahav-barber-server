import { Module } from "@nestjs/common";
import { UsersRepository } from "./users.service";
import { UserController } from "./users.controller";
import { MongooseModule } from "@nestjs/mongoose";
import { User, UserSchema } from "./user.model";
import { UsersValidator } from "./users.validator";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  controllers: [UserController],
  providers: [UsersRepository, UsersValidator, UsersHelper],
  exports: [
    UsersRepository,
    UsersValidator,
    UsersHelper,
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
})
export class UserModule { }
