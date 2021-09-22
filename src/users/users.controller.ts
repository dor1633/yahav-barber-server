import {
  Controller,
  Post,
  Body,
  HttpCode,
  HttpStatus,
} from "@nestjs/common";
import { ApiTags, ApiCreatedResponse, } from "@nestjs/swagger";
import { User } from "./dtos/user.dto";
import { UsersRepository } from "./users.service";

@Controller("users")
@ApiTags("Users")
export class UserController {
  constructor(
    private usersRepository: UsersRepository
  ) { }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiCreatedResponse({
    status: 200,
    description: "Create new user",
    type: [User],
  })
  async addUser(@Body() createdUser: User) {
    return await this.usersRepository.createUser(createdUser);
  }
}
