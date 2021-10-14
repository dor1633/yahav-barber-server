import {
  Controller,
  Post,
  Body,
  HttpCode,
  HttpStatus,
  Delete,
  Param,
} from "@nestjs/common";
import { ApiTags, ApiCreatedResponse, ApiOkResponse, } from "@nestjs/swagger";
import { Appointment } from "./dtos/appointment.dto";
import { AppointmentsRepository } from "./appointments.repository";
import { BarbersValidator } from "../barbers/barbers.validator";
import { UsersValidator } from "../users/users.validator";
import { convertDateAndTimeRangeToDatesObjects } from "src/common/dates.helper";
import { BarbersHelper } from "../barbers/barbers.helper";
import { AppointmentsParser } from "./appointments.parser.";
import { AppointmentsValidator } from "./appointments.validator";

@Controller("appointment")
@ApiTags("Appointment")
export class AppointmentsController {
  constructor(
    private barbersValidator: BarbersValidator,
    private barbersHelper: BarbersHelper,
    private usersValidator: UsersValidator,
    private appointmentsRepository: AppointmentsRepository,
    private appointmentsParser: AppointmentsParser,
    private appointmentsValidator: AppointmentsValidator,
  ) { }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiCreatedResponse({
    description: "schedule an appointment to barber",
    type: [Appointment],
  })
  async scheduleAnAppointmentToBarber(@Body() appointment: Appointment) {
    //////////////////todo: user has other appointment in this time 
    const barber = await this.barbersValidator.getBarberIfExist(appointment.barberId);
    await this.usersValidator.throwErrorIfUserIdDoesNotExist(appointment.clientId);
    const dateRange = convertDateAndTimeRangeToDatesObjects(appointment.date, appointment.timeRange);

    this.barbersValidator.validateBarberAvailableDuringDate(barber, dateRange);
    await this.barbersHelper.updateBarberAvailableAfterUserInviteAppointment(barber, dateRange);

    return this.appointmentsRepository.createAppointment(this.appointmentsParser.parseAppointmentDtoToDbObject(appointment, dateRange));
  }

  @Delete(":appointmentId")
  @ApiOkResponse({
    description: "delete an appointment",
    type: [Appointment],
  })
  async deleteAppointment(@Param("appointmentId") appointmentId: string) {
    const appointment = await this.appointmentsValidator.getAppointmentIfExist(appointmentId);

    this.barbersHelper.updateBarberAvailableAfterUserCancellingAppointment(appointment);
    await this.appointmentsRepository.deleteAppointment(appointmentId);

    return appointment;
  }
}