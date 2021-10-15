import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import * as _ from 'lodash'
import { DateRange, getFormattedDate } from "src/common/dates.helper";
import { User } from "src/users/schemas/user.model";
import { UsersRepository } from "../users/users.repository";
import { BarbersRepository } from "./barbers.repository";
import { AvailabilityPerDate } from "./dtos/availabilityPerDate.dto";
import { Barber } from "./schemas/barber.schema";

@Injectable()
export class BarbersValidator {
  constructor(private barbersRepository: BarbersRepository) {
  }

  async getBarberIfExist(barberId: string) {
    const barber = await this.barbersRepository.getBarberById(barberId);

    if (_.isEmpty(barber)) {
      throw new NotFoundException(`Barber ${barberId} doesn't exist`);
    }

    return barber;
  }

  validateBarberAvailableDuringDate(barber: Barber, dateRange: DateRange) {
    const { fromDate, toDate } = dateRange;

    if (fromDate >= toDate) {
      throw new BadRequestException(`Invalid dates`);
    }

    const formattedDate = getFormattedDate(fromDate);
    if (!barber.availability[formattedDate] ||
      !barber.availability[formattedDate].some(time => fromDate.getTime() >= time.from && time.to >= toDate.getTime())) {
      throw new BadRequestException(`The barber isn't available that date and time`);
    }
  }

  validateAvailabilityObject(availabilityPerDate: AvailabilityPerDate) {
    for (const availabilityDate in availabilityPerDate) {
      if (availabilityDate.length !== 8) {
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