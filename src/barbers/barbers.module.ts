import { forwardRef, Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { AppointmentsModule } from "src/appointments/appointments.module";
import { UsersModule } from "../users/users.module";
import { BarbersController } from "./barbers.controller";
import { BarbersHelper } from "./barbers.helper";
import { BarbersRepository } from "./barbers.repository";
import { BarbersValidator } from "./barbers.validator";
import { Barber, BarberSchema } from "./schemas/barber.schema";

@Module({
  imports: [
    UsersModule,
    MongooseModule.forFeature([{ name: Barber.name, schema: BarberSchema }]),
    forwardRef(() => AppointmentsModule),
  ],
  controllers: [BarbersController],
  providers: [BarbersValidator, BarbersHelper, BarbersRepository],
  exports: [BarbersValidator, BarbersHelper],
})
export class BarbersModule { }
