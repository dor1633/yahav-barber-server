import {
  Controller,
  Post,
  Body,
  HttpCode,
  HttpStatus,
  Query,
  Get,
  UseGuards,
} from "@nestjs/common";
import { ApiTags, ApiCreatedResponse, ApiQuery, ApiBearerAuth } from "@nestjs/swagger";
import { FirebaseAuthGuard } from "../firebase/firebase-auth.guard";
import { User } from "./dtos/user.dto";
import { UsersHelper } from "./users.helper.";
import { UsersRepository } from "./users.repository";

@Controller("users")
@ApiBearerAuth('access-token')
@ApiTags("Users")
export class UserController {
  constructor(
    private usersRepository: UsersRepository,
    private usersHelper: UsersHelper
  ) { }

  @Post()
  @UseGuards(FirebaseAuthGuard)
  @HttpCode(HttpStatus.CREATED)
  @ApiCreatedResponse({
    status: HttpStatus.CREATED,
    description: "Create new user",
    type: [User],
  })
  async addUser(@Body() createdUser: User) {
    return await this.usersRepository.createUser(createdUser);
  }

  @Get()
  @ApiQuery({
    name: 'phoneNumber',
    type: String,
    required: false
  })
  async getUserByParams(@Query('phoneNumber') phoneNumber) {
    const user = await this.usersRepository.getUserByPhoneNumber(phoneNumber);

    this.usersHelper.handleGetUserResponse(user);

    return user;
  }
}
