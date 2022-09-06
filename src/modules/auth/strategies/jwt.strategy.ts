import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import {UserEntity} from "../../../entities/user.entity";
import {UserRepository} from "../../user/repositories/user.repository";
import {JwtConstants} from "../../../common/constants/JWT";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        private readonly _userRepo: UserRepository
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: JwtConstants.secretKey,
        });
    }

    async validate({ email, iat, exp }): Promise<UserEntity> {
        const timeDiff = exp - iat;

        if (timeDiff <= 0) {
            throw new UnauthorizedException();
        }

        const user = await this._userRepo.findOneBy({ email });

        if (!user) {
            throw new UnauthorizedException();
        }

        return user;
    }
}
