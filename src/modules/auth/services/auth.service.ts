import { Injectable } from '@nestjs/common';
import {JwtService} from "@nestjs/jwt";
import {UserRepository} from "../../user/repositories/user.repository";
import {UserEntity} from "../../../entities/user.entity";
import {RegisterUserDto} from "../dto/registerUserDto";
import {UserDto} from "../../user/dtos/userDto";
import {UtilsService} from "../../../utils/services/utils.service";
import {InjectMapper} from "@automapper/nestjs";
import {Mapper} from "@automapper/core";
import {TokenPayloadDto} from "../dto/token.payload.dto";
import {JwtConstants} from "../../../common/constants/JWT";
import {LoginUserDto} from "../dto/loginUserDto";
import {UserNotFoundException} from "../../../common/exceptions/user.not.found.exception";
import {InvalidCredentialsException} from "../../../common/exceptions/invalid-credentials.exception";

@Injectable()
export class AuthService {
    constructor(
        private readonly _userRepo: UserRepository,
        private readonly _jwtTokenService: JwtService,
        @InjectMapper() private readonly _classMapper: Mapper,
    ) {
    }

    /**
     * @param model <LoginUserDto>
     */
    public async validateUser(model: LoginUserDto): Promise<UserEntity> {
        console.log(model);
        const {email, password} = model;
        const user = await this._userRepo.findOneBy({email});
        console.log(user);

        if (!user)
            throw new UserNotFoundException();

        if (await UtilsService.validateHash(password, user?.password)) {
            return user;
        }

        throw new InvalidCredentialsException();
    }

    /**
     * @param user <UserEntity>
     */
    async tokenize(user: UserEntity): Promise<TokenPayloadDto> {
        const {id, email} = user;

        return new TokenPayloadDto({
            expiresIn: (Date.now() / 1000 | 0) + JwtConstants.expiresIn,
            accessToken: await this._jwtTokenService.signAsync({ id, email }),
        });
    }

    /**
     * @param model <RegisterUserDto>
     */
    public async registerUserAsync(model: RegisterUserDto): Promise<UserDto> {
        const entity = this._classMapper.map(model, RegisterUserDto, UserEntity);
        entity.password = UtilsService.generateHash(entity.password);
        const user = this._userRepo.create(entity);
        await this._userRepo.save(user);

        return this._classMapper.map(user, UserEntity, UserDto);
    }
}
