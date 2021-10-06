import { Injectable } from "@nestjs/common";
import * as _ from 'lodash'
import { AvailabilityPerDate } from "../users/dtos/availabilityPerDate.dto";
import { User } from "../users/dtos/user.dto";
import { UsersRepository } from "../users/users.service";

@Injectable()
export class BarbersHelper {
  constructor(private usersService: UsersRepository) {
  }

  updateBarberAvailability(barber: User, availabilityPerDate: AvailabilityPerDate) {
    if (_.isEmpty(barber.availabilityPerDate)) {
      barber.availabilityPerDate = {}
    }
    for (const availabilityDate in availabilityPerDate) {
      barber.availabilityPerDate[availabilityDate] = availabilityPerDate[availabilityDate];
    }
  }
}