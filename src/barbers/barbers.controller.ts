import {
  Controller,
  Post,
  Body,
  HttpCode,
  HttpStatus,
  Param,
} from "@nestjs/common";
import { ApiTags, ApiCreatedResponse, } from "@nestjs/swagger";
import { BarbersValidator } from "./barbers.validator";
import { AvailabilityPerDate } from "../users/dtos/availabilityPerDate.dto";
import { BarbersHelper } from "./barbers.helper";
import { UsersRepository } from "../users/users.repository";

@Controller("barbers")
@ApiTags("Barbers")
export class BarbersController {
  constructor(
    private barbersValidator: BarbersValidator,
    private barbersHelper: BarbersHelper,
    private usersRepository: UsersRepository
  ) { }

  @Post(":barberId/availability")
  @HttpCode(HttpStatus.CREATED)
  @ApiCreatedResponse({
    status: 201,
    description: "Enter availability of barber",
    type: [AvailabilityPerDate],
  })
  async enterAvailability(@Param("barberId") barberId: string, @Body() availabilityPerDate: AvailabilityPerDate) {
    const barber = await this.barbersValidator.getBarberIfExist(barberId);
    this.barbersValidator.validateAvailabilityObject(availabilityPerDate);
    this.barbersHelper.updateBarberAvailability(barber, availabilityPerDate);

    await this.usersRepository.updateUser(barber);

    return barber;
  }
}
