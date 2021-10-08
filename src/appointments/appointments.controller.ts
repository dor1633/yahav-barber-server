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
import { convertDateAndTimeRangeToDatesObjects } from "src/common/dates.helper";
import { BarbersHelper } from "../barbers/barbers.helper";
import { AppointmentsParser } from "./appointments.parser.";

@Controller("appointment")
@ApiTags("Appointment")
export class AppointmentsController {
  constructor(
    private barbersValidator: BarbersValidator,
    private barbersHelper: BarbersHelper,
    private usersValidator: UsersValidator,
    private appointmentsRepository: AppointmentsRepository,
    private appointmentsParser: AppointmentsParser,

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
    await this.usersValidator.throwErrorIfUserIdDoesNotExist(appointment.gettingHaircutId);
    const dateRange = convertDateAndTimeRangeToDatesObjects(appointment.date, appointment.timeRange);

    this.barbersValidator.validateBarberAvailableDuringDate(barber, dateRange);
    await this.barbersHelper.updateBarberAvailableAfterUserInviteAppointment(barber, dateRange);

    return this.appointmentsRepository.createAppointment(this.appointmentsParser.parseAppointmentDtoToDbObject(appointment, dateRange));
  }
}
