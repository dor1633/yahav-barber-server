import { Module } from "@nestjs/common";
import { AppointmentsRepository } from "./appointments.repository";
import { AppointmentsController } from "./appointments.controller";
import { MongooseModule } from "@nestjs/mongoose";
import { Appointment, AppointmentSchema } from "./schemas/appointment.model";
import { BarbersModule } from "../barbers/barbers.module";
import { UsersModule } from "../users/users.module";
import { BarbersHelper } from "../barbers/barbers.helper";
import { AppointmentsParser } from "./appointments.parser.";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Appointment.name, schema: AppointmentSchema }]),
    BarbersModule,
    UsersModule
  ],
  controllers: [AppointmentsController],
  providers: [AppointmentsRepository, BarbersHelper, AppointmentsParser],
  exports: [],
})
export class AppointmentsModule { }
