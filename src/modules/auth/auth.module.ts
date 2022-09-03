import {Module} from '@nestjs/common';
import {AuthService} from './services/auth.service';
import {UserService} from "../user/user.service";
import {UserRepository} from "../user/user.repository";
import {AuthController} from "./controllers/auth.controller.";

@Module({
    providers: [
        AuthService,
        UserService,
        UserRepository
    ],
    controllers: [
        AuthController
    ]
})
export class AuthModule {
}
