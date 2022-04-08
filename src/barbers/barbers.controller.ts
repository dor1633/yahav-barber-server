import {
  Controller,
  Post,
  Body,
  HttpCode,
  HttpStatus,
  Param,
  Get,
  UseGuards,
} from "@nestjs/common";
import { ApiTags, ApiCreatedResponse, ApiOkResponse, ApiBearerAuth } from "@nestjs/swagger";
import { BarbersValidator } from "./barbers.validator";
import { BarbersHelper } from "./barbers.helper";
import { Schedule } from './dtos/schedule.dto'
import { AvailabilityPerDate } from "./dtos/availabilityPerDate.dto";
import { Barber } from "./dtos/barber.dto";
import { BarbersRepository } from "./barbers.repository";
import { FirebaseAuthGuard } from "src/firebase/firebase-auth.guard";

@Controller("barbers")
@ApiBearerAuth('access-token')
@ApiTags("Barbers")
export class BarbersController {
  constructor(
    private barbersValidator: BarbersValidator,
    private barbersHelper: BarbersHelper,
    private barbersRepository: BarbersRepository
  ) { }

  @Post(":barberId/availability")
  @HttpCode(HttpStatus.CREATED)
  @UseGuards(FirebaseAuthGuard)
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

    return this.barbersHelper.formatBarberFreeSchedule(barber);
  }


  @Get(":barberId/futureSchedule")
  @UseGuards(FirebaseAuthGuard)
  @ApiOkResponse({
    description: "Get schedule of barber",
    type: Schedule,
  })
  async getScheduleOfBarber(@Param("barberId") barberId: string) {
    const barber = await this.barbersValidator.getBarberIfExist(barberId);

    return await this.barbersHelper.getBarberFutureSchedule(barber);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @UseGuards(FirebaseAuthGuard)
  @ApiCreatedResponse({
    description: "Create new user",
    type: [Barber],
  })
  async addUser(@Body() createdBarber: Barber) {
    return await this.barbersRepository.createBarber(createdBarber);
  }

  @Get()
  @ApiOkResponse({
    description: "Get all barbers",
    type: [Barber],
  })
  async getBarbers() {
    const barbers = await this.barbersRepository.getAllBarbers();
    const formattedBarbers = [];
    for (const barber of barbers) {
      formattedBarbers.push(this.barbersHelper.formatBarberFreeSchedule(barber));
    }

    return formattedBarbers;
  }
}
