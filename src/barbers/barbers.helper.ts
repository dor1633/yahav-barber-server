import { Injectable } from "@nestjs/common";
import _ from 'lodash'
import { AvailabilityPerDate } from "../users/dtos/availabilityPerDate.dto";
import { User } from "../users/dtos/user.dto";
import { UsersRepository } from "../users/users.service";

@Injectable()
export class BarbersHelper {
  constructor(private usersService: UsersRepository) {
  }

  updateBarberAvailability(barber: User, availabilityPerDate: AvailabilityPerDate) {
    for (const availabilityDate in availabilityPerDate) {
      if (!barber[availabilityDate]) {
        barber[availabilityDate] = availabilityPerDate[availabilityDate];
      } else {
        barber[availabilityDate] = barber[availabilityDate].concat(availabilityPerDate[availabilityDate])
      }
    }
  }
}