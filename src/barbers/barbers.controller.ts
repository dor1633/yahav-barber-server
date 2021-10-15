import {
  Controller,
  Post,
  Body,
  HttpCode,
  HttpStatus,
  Param,
  Get,
  Query,
} from "@nestjs/common";
import { ApiTags, ApiCreatedResponse, ApiQuery, } from "@nestjs/swagger";
import { BarbersValidator } from "./barbers.validator";
import { BarbersHelper } from "./barbers.helper";
import { Schedule } from './dtos/schedule.dto'
import { AvailabilityPerDate } from "./dtos/availabilityPerDate.dto";
import { Barber } from "./dtos/barber.model";
import { BarbersRepository } from "./barbers.repository";

@Controller("barbers")
@ApiTags("Barbers")
export class BarbersController {
  constructor(
    private barbersValidator: BarbersValidator,
    private barbersHelper: BarbersHelper,
    private barbersRepository: BarbersRepository
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

    await this.barbersRepository.updateBarber(barber);

    return barber;
  }


  @Get(":barberId/schedule")
  @HttpCode(HttpStatus.CREATED)
  @ApiCreatedResponse({
    status: 201,
    description: "Get schedule of barber",
    type: Schedule,
  })
  @ApiQuery({
    name: 'toDate',
    type: String,
    required: true
  })
  @ApiQuery({
    name: 'fromDate',
    type: String,
    required: true
  })
  async getScheduleOfBarber(@Param("barberId") barberId: string, @Query('fromDate') fromDate,
    @Query('toDate') toDate) {
    const barber = await this.barbersValidator.getBarberIfExist(barberId);

    return await this.barbersHelper.getScheduleOfBarberBetweenDates(barber, fromDate, toDate);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiCreatedResponse({
    status: HttpStatus.CREATED,
    description: "Create new user",
    type: [Barber],
  })
  async addUser(@Body() createdBarber: Barber) {
    return await this.barbersRepository.createBarber(createdBarber);
  }
}
