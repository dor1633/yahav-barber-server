import { Injectable } from "@nestjs/common";
import * as _ from 'lodash'
import { AvailabilityPerDate } from "../users/dtos/availabilityPerDate.dto";
import { User } from "../users/dtos/user.dto";
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
      barber.schedule[availabilityDate] = availabilityPerDate[availabilityDate];
    }
  }
}