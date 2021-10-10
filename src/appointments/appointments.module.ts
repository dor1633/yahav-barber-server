import { forwardRef, Module } from "@nestjs/common";
import { AppointmentsRepository } from "./appointments.repository";
import { AppointmentsController } from "./appointments.controller";
import { MongooseModule } from "@nestjs/mongoose";
import { Appointment, AppointmentSchema } from "./schemas/appointment.model";
import { BarbersModule } from "../barbers/barbers.module";
import { UsersModule } from "../users/users.module";
import { AppointmentsParser } from "./appointments.parser.";
import { AppointmentsValidator } from "./appointments.validator";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Appointment.name, schema: AppointmentSchema }]),
    forwardRef(() => BarbersModule),
    UsersModule
  ],
  controllers: [AppointmentsController],
  providers: [AppointmentsRepository, AppointmentsParser, AppointmentsValidator],
  exports: [AppointmentsRepository],
})
export class AppointmentsModule { }
