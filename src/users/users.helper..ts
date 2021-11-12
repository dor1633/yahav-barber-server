import { Injectable, NotFoundException } from "@nestjs/common";
import * as _ from 'lodash'
import { User } from "./schemas/user.model";

@Injectable()
export class UsersHelper {

    handleGetUserResponse(user: User) {
        if (!user) {
            throw new NotFoundException(`Not found user`);
        }
    }
}