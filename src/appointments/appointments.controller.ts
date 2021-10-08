import {
  Controller,
  Post,
  Body,
  HttpCode,
  HttpStatus,
} from "@nestjs/common";
import { ApiTags, ApiCreatedResponse, } from "@nestjs/swagger";
import { Appointment } from "./dtos/appointment.dto";
import { AppointmentsRepository } from "./appointments.repository";
import { BarbersValidator } from "../barbers/barbers.validator";
import { UsersValidator } from "../users/users.validator";

@Controller("appointment")
@ApiTags("Appointment")
export class AppointmentsController {
  constructor(
    private barbersValidator: BarbersValidator,
    private usersValidator: UsersValidator
  ) { }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiCreatedResponse({
    status: HttpStatus.CREATED,
    description: "schedule an appointment to barber",
    type: [Appointment],
  })
  async scheduleAnAppointmentToBarber(@Body() appointment: Appointment) {
    const barber = await this.barbersValidator.getBarberIfExist(appointment.barberId);
    const gettingHaircutUser = await this.usersValidator.throwErrorIfUserIdDoesNotExist(appointment.gettingHaircutId);
  }
}
