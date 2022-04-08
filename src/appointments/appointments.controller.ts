import {
  Controller,
  Post,
  Body,
  HttpCode,
  HttpStatus,
  Delete,
  Param,
  Get,
  Query,
  UseGuards,
} from "@nestjs/common";
import { ApiTags, ApiCreatedResponse, ApiOkResponse, ApiBearerAuth } from "@nestjs/swagger";
import { Appointment } from "./dtos/appointment.dto";
import { AppointmentsRepository } from "./appointments.repository";
import { BarbersValidator } from "../barbers/barbers.validator";
import { UsersValidator } from "../users/users.validator";
import { convertDateAndTimeRangeToDatesObjects } from "src/common/dates.helper";
import { BarbersHelper } from "../barbers/barbers.helper";
import { AppointmentsParser } from "./appointments.parser.";
import { AppointmentsValidator } from "./appointments.validator";
import { FirebaseAuthGuard } from "src/firebase/firebase-auth.guard";

@Controller("appointments")
@ApiBearerAuth('access-token')
@ApiTags("Appointment")
@UseGuards(FirebaseAuthGuard)
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

    const newAppointment = await this.appointmentsRepository.createAppointment(this.appointmentsParser.parseAppointmentDtoToDBObject(appointment, dateRange));

    return {
      _id: newAppointment._id,
      ...appointment
    }
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

  @Get("/future")
  @ApiOkResponse({
    description: "get future appointments of user",
    type: [Appointment],
  })
  async getFutureAppointmentsOfUser(@Query("userId") userId: string) {
    await this.usersValidator.throwErrorIfUserIdDoesNotExist(userId);
    const futureAppointments = await this.appointmentsRepository.getFutureAppointmentsOfClient(userId);

    return this.appointmentsParser.parseAppointmentsInDBToAppointmentsDto(futureAppointments);
  }
}