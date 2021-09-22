import {
  Controller,
  Post,
  Body,
  HttpCode,
  HttpStatus,
  Param,
} from "@nestjs/common";
import { ApiTags, ApiCreatedResponse, } from "@nestjs/swagger";
import { AvailabilityPerDate } from "./dtos/availabilityPerDate.dto";
import { User } from "./dtos/user.dto";
import { UsersRepository } from "./users.service";

@Controller("barbers")
@ApiTags("Barbers")
export class BarbersController {
  constructor(
    private usersRepository: UsersRepository
  ) { }

  @Post(":barberId/availability")
  @HttpCode(HttpStatus.CREATED)
  @ApiCreatedResponse({
    status: 201,
    description: "Enter availability of barber",
    type: [User],
  })
  async enterAvailability(@Param("barberId") barberId: string, @Body() availabilityPerDate: AvailabilityPerDate) {
    const
  }
}
