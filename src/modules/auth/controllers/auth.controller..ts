import {
    Body,
    Controller,
    HttpCode,
    HttpStatus,
    Post
} from '@nestjs/common';
import {UserDto} from "../../user/dtos/userDto";
import {RegisterUserDto} from "../dto/register.user.dto";
import {LoginUserDto} from "../dto/login.user.dto";
import {AuthService} from "../services/auth.service";
import {TokenPayloadDto} from "../dto/token.payload.dto";

@Controller('auth')
export class AuthController {
    constructor(
        private readonly _authService: AuthService
    ) {
    }

    @Post('register')
    @HttpCode(HttpStatus.OK)
    async userRegister(@Body() userRegisterDto: RegisterUserDto): Promise<UserDto> {
        return await this._authService.registerUserAsync(userRegisterDto);
    }

    @Post('login')
    @HttpCode(HttpStatus.OK)
    async login(@Body() model: LoginUserDto): Promise<TokenPayloadDto> {
        const user = await this._authService.validateUser(model);
        return await this._authService.tokenize(user);
    }
}
