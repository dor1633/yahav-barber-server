import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import * as _ from 'lodash'
import { AvailabilityPerDate } from "../users/dtos/availabilityPerDate.dto";
import { UsersRepository } from "../users/users.service";

@Injectable()
export class BarbersValidator {
  constructor(private usersService: UsersRepository) {
  }

  async getBarberIfExist(barberId: string) {
    const barber = await this.usersService.getById(barberId);

    if (_.isEmpty(barber)) {
      throw new NotFoundException(`Barber ${barberId} doesn't exist`);
    }

    if (!barber.isBarber) {
      throw new BadRequestException(`The user ${barberId} isn't barber`);
    }

    return barber;
  }

  validateAvailabilityPerDate(availabilityPerDate: AvailabilityPerDate) {
    for (const availabilityDate in availabilityPerDate) {
      if (availabilityDate.length !== 6) {
        throw new BadRequestException(`The date ${availabilityDate} doesn't valid`)
      }

      for (const availability of availabilityPerDate[availabilityDate]) {
        const times = availability.split("-");
        if (times.length !== 2) {
          throw new BadRequestException(`The times ${times.toString()} doesn't valid`)
        } else {
          for (const time of times) {
            if (!/^(2[0-3]|[0-1]?[\d]):[0-5][\d]$/.test(time)) {
              throw new BadRequestException(`The time ${time} doesn't valid`)
            }
          }
        }
      }
    }
  }
}