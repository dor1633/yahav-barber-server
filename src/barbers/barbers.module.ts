import { Module } from "@nestjs/common";
import { UsersModule } from "src/users/users.module";
import { BarbersController } from "./barbers.controller";

@Module({
  imports: [
    UsersModule
  ],
  controllers: [BarbersController],
  providers: [barbers],
  exports: [],
})
export class BarbersModule { }
