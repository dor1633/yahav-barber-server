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

  async getById(userId: string) {
    return this.usersModel.findById(userId).exec();
  }

  async getAllUsers() {
    return this.usersModel.find().exec();

  }

  async updateUser(user: User) {
    return this.usersModel.updateOne({ _id: user._id }, user).exec();
  }
}
