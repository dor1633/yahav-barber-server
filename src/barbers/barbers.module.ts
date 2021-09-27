import { Module } from "@nestjs/common";
import { UsersModule } from "src/users/users.module";
import { BarbersController } from "./barbers.controller";
import { BarbersHelper } from "./barbers.helper";
import { BarbersValidator } from "./barbers.validator";

@Module({
  imports: [
    UsersModule
  ],
  controllers: [BarbersController],
  providers: [BarbersValidator, BarbersHelper],
  exports: [],
})
export class BarbersModule { }
