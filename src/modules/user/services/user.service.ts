import {Injectable} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {UserEntity} from "../../../entities/user.entity";
import {Repository} from "typeorm";
import {RegisterUserDto} from "../../auth/dto/registerUserDto";
import {UserRepository} from "../repositories/user.repository";
import {InjectMapper} from "@automapper/nestjs";
import {Mapper} from "@automapper/core";
import {UtilsService} from "../../../utils/services/utils.service";
import {UserDto} from "../dtos/userDto";
import {EntityCreationFailedException} from "../../../common/exceptions/entity-creation-failed.exception";

@Injectable()
export class UserService {
    /**
     *
     * @param _userRepo
     * @param _classMapper
     */
    constructor(
        private readonly _userRepo: UserRepository,
        @InjectMapper() private readonly _classMapper: Mapper,
    ) {
    }
}
