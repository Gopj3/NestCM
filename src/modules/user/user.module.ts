import {Module} from '@nestjs/common';
import {UserService} from './user.service';
import {UserRepository} from "./user.repository";
import {TypeOrmModule} from "@nestjs/typeorm";
import {UserEntity} from "../../entities/user.entity";
import {UserProfileMapper} from "../../common/profiles/user.profile.mapper";

@Module({
    providers: [
        UserService,
        UserRepository,
        UserProfileMapper
    ],
    exports: [UserService, UserRepository],
})
export class UserModule {}
