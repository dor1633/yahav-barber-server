import { Injectable, NotFoundException } from "@nestjs/common";
import { UsersRepository } from "./users.repository";

@Injectable()
export class UsersValidator {
    constructor(private usersRepository: UsersRepository) {
    }

    async throwErrorIfUserIdDoesNotExist(userId: string) {
        const existUser = await this.usersRepository.getById(userId);
        if (!existUser) {
            throw new NotFoundException(`Wrong credentials.`);
        }

        return existUser;
    }
}