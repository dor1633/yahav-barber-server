import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { User as UserDto } from "./dtos/user.dto";
import { User } from "./schemas/user.model";

@Injectable()
export class UsersRepository {
  constructor(@InjectModel(User.name) private readonly usersModel: Model<User>) {
  }

  async createUser(user: UserDto) {
    const createdUser = new this.usersModel(user);
    return createdUser.save();
  }
}
