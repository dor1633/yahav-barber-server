import {
  Controller,
  Post,
  Body,
  HttpCode,
  HttpStatus,
} from "@nestjs/common";
import { ApiTags, ApiCreatedResponse, } from "@nestjs/swagger";
import { Appointment } from "./dtos/appointment.dto";
import { User } from "./dtos/user.dto";
import { UsersRepository } from "./users.repository";

@Controller("users")
@ApiTags("Users")
export class UserController {
  constructor(
    private usersRepository: UsersRepository
  ) { }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiCreatedResponse({
    status: HttpStatus.CREATED,
    description: "Create new user",
    type: [User],
  })
  async addUser(@Body() createdUser: User) {
    return await this.usersRepository.createUser(createdUser);
  }

  @HttpCode(HttpStatus.CREATED)
  @ApiCreatedResponse({
    status: HttpStatus.CREATED,
    description: "schedule an appointment to barber",
    type: [User],
  })
  async scheduleAnAppointmentToBarber(@Body() createdUser: Appointment) {
    return await this.usersRepository.createUser(createdUser);
  }
}
