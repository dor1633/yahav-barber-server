import { Injectable } from "@nestjs/common";
import * as _ from 'lodash'
import { convertDateAndTimeRangeToDatesObjects, DateRange, getFormattedDate } from "../common/dates.helper";
import { User } from "../users/schemas/user.model";
import { AvailabilityPerDate } from "../users/dtos/availabilityPerDate.dto";
import { UsersRepository } from "../users/users.repository";
import { TimeRange } from "src/users/schemas/barberSchedule.model";

@Injectable()
export class BarbersHelper {
  constructor(private usersRepository: UsersRepository) {
  }

  async updateBarberAvailableAfterUserInviteAppointment(barber: User, appointmentDateRange: DateRange) {
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
    await this.usersRepository.updateUser(barber);
  }

  updateBarberAvailability(barber: User, availabilityPerDate: AvailabilityPerDate) {
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
}