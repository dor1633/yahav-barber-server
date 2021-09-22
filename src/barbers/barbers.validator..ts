import { Injectable } from "@nestjs/common";
import { Post } from "src/posts/posts.model";
import { UsersRepository } from "./users.service";
import * as _ from 'lodash'
import { PopularHashtags } from "src/Hashtag/popularHashtags.model";

@Injectable()
export class BarbersValidator {
  constructor(private usersService: UsersRepository) {
  }
}