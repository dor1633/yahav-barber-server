import { Module } from "@nestjs/common";
import { UsersRepository } from "./users.service";
import { UserController } from "./users.controller";
import { MongooseModule } from "@nestjs/mongoose";
import { User, UserSchema } from "./schemas/user.model";
// import { UsersValidator } from "./users.validator";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  controllers: [UserController],
  providers: [UsersRepository],
  exports: [
    UsersRepository,
    // UsersValidator,
    // UsersHelper,
  ],
})
export class UsersModule { }
