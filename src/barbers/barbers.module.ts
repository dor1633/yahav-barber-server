import { forwardRef, Module } from "@nestjs/common";
import { AppointmentsModule } from "src/appointments/appointments.module";
import { UsersModule } from "../users/users.module";
import { BarbersController } from "./barbers.controller";
import { BarbersHelper } from "./barbers.helper";
import { BarbersValidator } from "./barbers.validator";

@Module({
  imports: [
    UsersModule,
    forwardRef(() => AppointmentsModule),
  ],
  controllers: [BarbersController],
  providers: [BarbersValidator, BarbersHelper],
  exports: [BarbersValidator, BarbersHelper],
})
export class BarbersModule { }
