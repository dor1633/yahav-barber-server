import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { CreateUserDto } from "./dto/create-user.dto";
import { LoginUserDto } from "./dto/login-user.dto";
import { User, UserDto } from "./user.model";

@Injectable()
export class UsersRepository {
  constructor(@InjectModel(User.name) private readonly usersModel: Model<User>) {
  }

  async addUser(user: UserDto) {
    const createdUser = new this.usersModel(user);
    return createdUser.save();
  }

  async create(createUserDto: CreateUserDto) {
    await this.isUserNameUnique(createUserDto.username);
    await this.isEmailUnique(createUserDto.email);

    const newUser = await this.createUserDto(createUserDto);
    const user = await this.basicUsersService.createEntity(newUser);

    return {
      user,
      accessToken: await this.authService.createAccessToken(user.id),
      refreshToken: await this.authService.createRefreshToken(user.id),
    };
  }

  async getOrCreate(createUserDto: CreateUserDto) {
    let user = await this.getUserByEmail(createUserDto.email);

    if (user == null) {
      const newUser = await this.createUserDto(createUserDto);
      user = await this.basicUsersService.createEntity(newUser);
    }

    if (createUserDto.photoUrl != null && user.image !== createUserDto.photoUrl) {
      user.image = createUserDto.photoUrl;
      await user.save();
    }

    return {
      user,
      accessToken: await this.authService.createAccessToken(user.id),
      refreshToken: await this.authService.createRefreshToken(user.id),
    };
  }

  async getUserByUserName(username: string) {
    const [result] = await this.basicUsersService.findWithFilter({ username });
    return result;
  }

  async getUserByEmail(email: string): Promise<User> {
    return await this.usersModel.findOne({ email });
  }

  async login(loginUserDto: LoginUserDto) {
    const user = await this.getUserByUserName(loginUserDto.username);
    await this.authService.checkPassword(loginUserDto.password, user);
    return {
      user,
      accessToken: await this.authService.createAccessToken(user._id),
      refreshToken: await this.authService.createRefreshToken(user._id),
    };
  }

  private async createUserDto(createUserDto: CreateUserDto) {
    const newUser = new UserDto();
    newUser.email = createUserDto.email;
    newUser.username = createUserDto.username;
    newUser.fullName = createUserDto.fullName;
    newUser.acceptedChallenges = [];
    newUser.recommendedChallenges = [];
    newUser.image = "";
    const salt = await bcrypt.genSalt(10);
    newUser.password = await bcrypt.hash(createUserDto.password, salt);

    return newUser;
  }

  private async isUserNameUnique(username: string) {
    const user = await this.usersModel.findOne({ username });
    if (user) {
      throw new BadRequestException("User name must be unique.");
    }
  }

  private async isEmailUnique(email: string) {
    const user = await this.usersModel.findOne({ email });
    if (user) {
      throw new BadRequestException("Email must be unique.");
    }
  }

  async findUsersByIds(usersIds: string[]) {
    return this.basicUsersService.findByIds(usersIds);
  }

  async findUserById(userId: string) {
    return this.basicUsersService.findById(userId);
  }

  async addAcceptChallengeToUsers(challengeId: string, usersIds: string[]) {
    return this.usersModel.updateMany(
      { _id: { $in: usersIds } },
      { $addToSet: { acceptedChallenges: challengeId }, $pull: { recommendedChallenges: challengeId } }
    );
  }

  async addRecommendChallengeToUsers(challengeId: string, usersIds: string[]) {
    return this.usersModel.updateMany(
      { _id: { $in: usersIds } },
      { $addToSet: { recommendedChallenges: challengeId } }
    );
  }
}
