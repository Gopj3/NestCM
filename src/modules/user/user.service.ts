import {Injectable} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {UserEntity} from "../../entities/user.entity";
import {Repository} from "typeorm";
import {RegisterUserDto} from "../auth/dto/registerUserDto";
import {UserRepository} from "./user.repository";
import {InjectMapper} from "@automapper/nestjs";
import {Mapper} from "@automapper/core";
import {UtilsService} from "../../utils/services/utils.service";
import {UserDto} from "./dtos/userDto";
import {EntityCreationFailedException} from "../../common/exceptions/entity-creation-failed.exception";

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

    /**
     *
     * @param model
     */
    public async registerUserAsync(model: RegisterUserDto): Promise<UserDto> {
        const entity = this._classMapper.map(model, RegisterUserDto, UserEntity);
        entity.password = UtilsService.generateHash(entity.password);
        const user = this._userRepo.create(entity);
        await this._userRepo.save(user);

        return this._classMapper.map(user, UserEntity, UserDto);
    }
}
