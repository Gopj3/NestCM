import {Module} from '@nestjs/common';
import {AuthService} from './services/auth.service';
import {UserService} from "../user/services/user.service";
import {UserRepository} from "../user/repositories/user.repository";
import {AuthController} from "./controllers/auth.controller.";
import {PassportModule} from "@nestjs/passport";
import {UserProfileMapper} from "../../common/profiles/user.profile.mapper";
import {JwtStrategy} from "./strategies/jwt.strategy";
import {JwtService} from "@nestjs/jwt";

@Module({
    providers: [
        AuthService,
        UserService,
        UserRepository,
        UserProfileMapper,
        JwtStrategy,
        JwtService
    ],
    imports: [
        PassportModule.register({ defaultStrategy: 'jwt' }),
    ],
    controllers: [AuthController],
    exports: [PassportModule.register({ defaultStrategy: 'jwt' }), AuthService, JwtStrategy]
})
export class AuthModule {
}
