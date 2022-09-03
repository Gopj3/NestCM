/* istanbul ignore file */
import {AutomapperProfile, InjectMapper} from "@automapper/nestjs";
import {createMap, forMember, ignore, mapFrom, Mapper, MappingProfile} from "@automapper/core";
import {Injectable} from "@nestjs/common";
import {UserEntity} from "../../entities/user.entity";
import {RegisterUserDto} from "../../modules/auth/dto/registerUserDto";
import {UserDto} from "../../modules/user/dtos/userDto";

@Injectable()
export class UserProfileMapper extends AutomapperProfile {
    constructor(@InjectMapper() mapper: Mapper) {
        super(mapper);
    }

    override get profile() {
        return (mapper) => {
            createMap(mapper, RegisterUserDto, UserEntity);
            createMap(mapper, UserEntity, UserDto);
        };
    }
}
