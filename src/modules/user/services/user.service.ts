import { Injectable } from "@nestjs/common";
import { UserRepository } from "../repositories/user.repository";
import { InjectMapper } from "@automapper/nestjs";
import { Mapper } from "@automapper/core";

@Injectable()
export class UserService {
  /**
   * @param _classMapper
   * @param _userRepo
   */
  constructor(
    @InjectMapper()
    private readonly _classMapper: Mapper,
    private readonly _userRepo: UserRepository
  ) {}
}
