import {Module} from '@nestjs/common';
import {UserService} from './services/user.service';
import {UserRepository} from "./repositories/user.repository";
import {UserProfileMapper} from "../../common/profiles/user.profile.mapper";
import {UserProfileRepository} from "./repositories/user-profile.repository";
import {UsersController} from "./controllers/users.controller";

@Module({
    providers: [
        UserService,
        UserRepository,
        UserProfileMapper,
        UserProfileRepository
    ],
    exports: [
        UserService,
        UserRepository,
        UserProfileRepository
    ],
    controllers: [
        UsersController
    ]
})
export class UserModule {}
