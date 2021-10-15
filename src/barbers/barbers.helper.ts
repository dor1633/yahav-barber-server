import { Injectable } from "@nestjs/common";
import * as _ from 'lodash'
import { convertDateAndTimeRangeToDatesObjects, convertDateToDateObject, DateRange, formatDateToTime, getFormattedDate } from "../common/dates.helper";
import { User } from "../users/schemas/user.model";
import { UsersRepository } from "../users/users.repository";
import { Appointment } from "../appointments/schemas/appointment.model";
import { BarbersValidator } from "./barbers.validator";
import { Schedule } from './dtos/schedule.dto'
import { AppointmentsRepository } from "src/appointments/appointments.repository";
import { Barber } from "./schemas/barber.schema";
import { AvailabilityPerDate } from "./dtos/availabilityPerDate.dto";
import { TimeRange } from "./schemas/barberSchedule.schema";
import { BarbersRepository } from "./barbers.repository";

@Injectable()
export class BarbersHelper {
  constructor(private barbersRepository: BarbersRepository,
    private usersRepository: UsersRepository,
    private barbersValidator: BarbersValidator,
    private appointmentsRepository: AppointmentsRepository,
  ) {
  }

  async updateBarberAvailableAfterUserInviteAppointment(barber: Barber, appointmentDateRange: DateRange) {
    const { fromDate, toDate } = appointmentDateRange;
    const formattedDate = getFormattedDate(fromDate);
    const newTimeRanges: TimeRange[] = [];

    for (const time of barber.schedule[formattedDate]) {
      if (fromDate.getTime() >= time.from && time.to >= toDate.getTime()) {
        if (time.from !== fromDate.getTime()) {
          newTimeRanges.push({ from: time.from, to: fromDate.getTime() });
        }
        if (toDate.getTime() !== time.to) {
          newTimeRanges.push({ from: toDate.getTime(), to: time.to });
        }
      } else {
        newTimeRanges.push(time)
      }
    }

    barber.schedule[formattedDate] = newTimeRanges;
    await this.barbersRepository.updateBarber(barber);
  }

  async updateBarberAvailableAfterUserCancellingAppointment(appointment: Appointment) {
    const barber = await this.barbersValidator.getBarberIfExist(appointment.barberId);
    const formattedDate = getFormattedDate(new Date(appointment.from));
    barber.schedule[formattedDate].push({ from: appointment.from, to: appointment.to });

    await this.barbersRepository.updateBarber(barber);
  }

  updateBarberAvailability(barber: Barber, availabilityPerDate: AvailabilityPerDate) {
    if (_.isEmpty(barber.schedule)) {
      barber.schedule = {}
    }

    for (const availabilityDate in availabilityPerDate) {
      const formattedAvailabilityDate = availabilityDate.replace(/-/g, '');
      barber.schedule[formattedAvailabilityDate] = [];
      for (const timeRange of availabilityPerDate[availabilityDate]) {
        const { fromDate, toDate } = convertDateAndTimeRangeToDatesObjects(availabilityDate, timeRange);
        barber.schedule[formattedAvailabilityDate].push({ from: fromDate.getTime(), to: toDate.getTime() });
      }
    }
  }

  async getScheduleOfBarberBetweenDates(barber: Barber, fromDateString: string, toDateString: string): Promise<Schedule> {
    const fromDate = convertDateToDateObject(fromDateString);
    let toDate = convertDateToDateObject(toDateString);
    toDate = new Date(toDate.setDate(toDate.getDate() + 1));
    const relevantAppointments = await this.appointmentsRepository.getAppointmentsOfBarberBetweenDates(barber._id,
      fromDate, toDate);

    return this.formatAppointmentsToSchedule(relevantAppointments);

  }

  async formatAppointmentsToSchedule(relevantAppointments: Appointment[]): Promise<Schedule> {
    const schedule: Schedule = {};
    const users = await this.usersRepository.getAllUsers();
    for (const appointment of relevantAppointments) {
      const date = getFormattedDate(new Date(appointment.from), true)
      if (!schedule[date]) {
        schedule[date] = [];
      }

      const client = users.find(user => user._id.toString() === appointment.clientId)
      schedule[date].push({
        appointmentId: appointment._id,
        clientId: client._id,
        clientName: client.name,
        timeRange: `${formatDateToTime(new Date(appointment.from))}-${formatDateToTime(new Date(appointment.to))}`
      });
    }

    return schedule;
  }
}