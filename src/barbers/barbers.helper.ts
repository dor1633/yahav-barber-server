import { Injectable } from "@nestjs/common";
import * as _ from 'lodash'
import { convertDateAndTimeRangeToDatesObjects } from "../common/dates.helper";
import { User } from "../users/schemas/user.model";
import { AvailabilityPerDate } from "../users/dtos/availabilityPerDate.dto";
import { UsersRepository } from "../users/users.repository";

@Injectable()
export class BarbersHelper {
  constructor(private usersService: UsersRepository) {
  }

  updateBarberAvailability(barber: User, availabilityPerDate: AvailabilityPerDate) {
    if (_.isEmpty(barber.schedule)) {
      barber.schedule = {}
    }

    for (const availabilityDate in availabilityPerDate) {
      barber.schedule[availabilityDate] = [];
      for (const timeRange of availabilityPerDate[availabilityDate]) {
        const { fromDate, toDate } = convertDateAndTimeRangeToDatesObjects(availabilityDate, timeRange);
        barber.schedule[availabilityDate].push({ from: fromDate.getTime(), to: toDate.getTime() });
      }
    }
  }
}