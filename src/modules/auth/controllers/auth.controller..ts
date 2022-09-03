import {
    Body,
    Controller, ForbiddenException,
    HttpCode, HttpException,
    HttpStatus,
    Patch,
    Post,
    Req, UseFilters,
    UseGuards,
    UseInterceptors,
} from '@nestjs/common';
import {UserService} from "../../user/user.service";
import {UserDto} from "../../user/dtos/userDto";
import {RegisterUserDto} from "../dto/registerUserDto";
import {QueryFailedFilter} from "../../../common/filters/query-failed.filter";
import {HttpExceptionFilter} from "../../../common/filters/bad-request.filter";

@Controller('auth')
export class AuthController {
    constructor(
        private readonly _userService: UserService
    ) {
    }

    @Post('register')
    @HttpCode(HttpStatus.OK)
    async userRegister(
        @Body() userRegisterDto: RegisterUserDto,
    ): Promise<UserDto> {
       return await this._userService.registerUserAsync(userRegisterDto);
    }
}
